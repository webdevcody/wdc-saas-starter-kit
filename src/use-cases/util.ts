import { ZodTypeAny, z } from "zod";

type ValidatedCallbackOptions<
  CallbackInput,
  OutputValidation extends ZodTypeAny,
  InputValidation extends ZodTypeAny
> = {
  outputs?: OutputValidation;
  inputs?: InputValidation;
  handler: InputValidation extends ZodTypeAny
    ? (input: z.infer<InputValidation>) => any
    : (input: CallbackInput) => any;
};

export function createUseCase<
  CallbackInput,
  OutputValidation extends ZodTypeAny,
  InputValidation extends ZodTypeAny
>(
  options: ValidatedCallbackOptions<
    CallbackInput,
    OutputValidation,
    InputValidation
  >
) {
  return async function (
    input: CallbackInput
  ): Promise<z.infer<OutputValidation>> {
    const passthrough = { parse: (i: any) => i };
    const { inputs, handler, outputs } = options;
    const validatedInput = (inputs ?? passthrough).parse(input);
    const outputResult = await handler(validatedInput);
    const parsedOutput = (outputs ?? passthrough).parse(outputResult);
    return parsedOutput;
  };
}
