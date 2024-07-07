"use client";

import { LoaderButton } from "@/components/loader-button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useContext, useEffect, useRef, useState } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CalendarDays,
  CalendarIcon,
  Check,
  Clock,
  Terminal,
} from "lucide-react";
import { btnIconStyles } from "@/styles/icons";
import { Textarea } from "@/components/ui/textarea";
import { editEventAction } from "./actions";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Event } from "@/db/schema";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "@/components/ui/time-picker-input";
import { Period } from "@/components/ui/time-picker-utils";
import { TimePeriodSelect } from "@/components/ui/time-period-select";
import { useServerAction } from "zsa-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ToggleContext } from "@/components/interactive-overlay";
import {
  MAX_UPLOAD_IMAGE_SIZE,
  MAX_UPLOAD_IMAGE_SIZE_IN_MB,
} from "@/app-config";
import { formatDate } from "@/util/date";

const editEventSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  startsOn: z.date(),
  file: z
    .instanceof(File)
    .refine((file) => file.size < MAX_UPLOAD_IMAGE_SIZE, {
      message: `Your image was too large. It must be under ${MAX_UPLOAD_IMAGE_SIZE_IN_MB}MB`,
    })
    .optional(),
});

function getPeriod(date: Date) {
  return date.getHours() >= 12 ? "PM" : "AM";
}

export function EditEventForm({ event }: { event: Event }) {
  const { setIsOpen: setIsOverlayOpen } = useContext(ToggleContext);
  const { toast } = useToast();
  const minuteRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);
  const periodRef = useRef<HTMLButtonElement>(null);
  const [date, setDate] = useState<Date | undefined>(event.startsOn);
  const [period, setPeriod] = useState<Period>(getPeriod(event.startsOn));

  const { execute, error, isPending } = useServerAction(editEventAction, {
    onSuccess() {
      toast({
        title: "Success",
        description: "Event created successfully.",
      });
      setIsOverlayOpen(false);
    },
    onError() {
      toast({
        title: "Uh oh",
        variant: "destructive",
        description: "Something went wrong creating your event.",
      });
    },
  });

  const form = useForm<z.infer<typeof editEventSchema>>({
    resolver: zodResolver(editEventSchema),
    defaultValues: {
      name: event.name,
      description: event.description,
      startsOn: event.startsOn,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof editEventSchema>> = (values) => {
    const newDate = new Date(
      values.startsOn?.getFullYear() ?? 0,
      values.startsOn?.getMonth() ?? 0,
      values.startsOn?.getDate() ?? 0,
      date?.getHours() ?? 0,
      date?.getMinutes() ?? 0,
      date?.getSeconds() ?? 0
    );

    const formData = new FormData();
    if (values.file) {
      formData.append("file", values.file);
    }

    execute({
      eventId: event.id,
      name: values.name,
      description: values.description,
      startsOn: newDate,
      fileWrapper: formData,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 flex-1 px-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={7} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startsOn"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Event</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        formatDate(field.value)
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => {
                      const todayMinus1Day = new Date();
                      todayMinus1Day.setDate(todayMinus1Day.getDate() - 1);
                      return date < todayMinus1Day;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormLabel className="mt-4">Time of Event</FormLabel>

        <div className="flex items-end gap-2">
          <div className="grid gap-1 text-center">
            <Label htmlFor="hours" className="text-xs">
              Hours
            </Label>
            <TimePickerInput
              picker="12hours"
              period={period}
              date={date}
              setDate={setDate}
              ref={hourRef}
              onRightFocus={() => minuteRef.current?.focus()}
            />
          </div>
          <div className="grid gap-1 text-center">
            <Label htmlFor="minutes" className="text-xs">
              Minutes
            </Label>
            <TimePickerInput
              picker="minutes"
              date={date}
              setDate={setDate}
              ref={minuteRef}
              onLeftFocus={() => hourRef.current?.focus()}
              onRightFocus={() => secondRef.current?.focus()}
            />
          </div>
          <div className="grid gap-1 text-center">
            <Label htmlFor="period" className="text-xs">
              Period
            </Label>
            <TimePeriodSelect
              period={period}
              setPeriod={setPeriod}
              date={date}
              setDate={setDate}
              ref={periodRef}
              onLeftFocus={() => secondRef.current?.focus()}
            />
          </div>

          <div className="flex h-10 items-center">
            <Clock className="ml-2 h-4 w-4" />
          </div>
        </div>

        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files && event.target.files[0];
                    onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error creating event</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        <LoaderButton
          onClick={() => {
            onSubmit(form.getValues());
          }}
          isLoading={isPending}
        >
          <Check className={btnIconStyles} /> Save Updates
        </LoaderButton>
      </form>
    </Form>
  );
}
