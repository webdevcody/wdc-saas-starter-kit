import { FC, ReactNode } from "react";
import { z } from "zod";

export function safeRoute<
  T extends z.AnyZodObject,
  X extends (a: Zod.infer<T>) => ReactNode
>(schema: T, page: X) {
  return (props: any) => {
    const result = schema.safeParse(props);
    if (result.error) {
      throw new Error("Invalid params");
    }
    const parsedProps = result.data as Zod.infer<T>;

    return page(parsedProps);
  };
}
