import { z } from "zod";
export const socialUrlSchema = {
  youtubeLink: z
    .string()
    .url()
    .regex(/https\:\/\/youtube\.com/, {
      message: "Must be a Youtube link",
    })
    .optional()
    .or(z.literal("")),
  discordLink: z
    .string()
    .url()
    .regex(/https\:\/\/(discord\.gg|discordapp\.com)/, {
      message: "Must be a Discord link",
    })
    .optional()
    .or(z.literal("")),
  xLink: z
    .string()
    .url()
    .regex(/https\:\/\/(x|twitter)\.com/, {
      message: "Must be an X link",
    })
    .optional()
    .or(z.literal("")),
  githubLink: z
    .string()
    .url()
    .regex(/https\:\/\/github\.com/, {
      message: "Must be a Github link",
    })
    .optional()
    .or(z.literal("")),
};
