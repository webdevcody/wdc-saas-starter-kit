import { ZSAError } from "zsa";

export function toZSAError(error: Error) {
  throw new ZSAError("ERROR", error.message);
}
