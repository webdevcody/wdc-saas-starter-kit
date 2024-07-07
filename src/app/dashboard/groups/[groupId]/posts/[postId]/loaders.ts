import { getUserProfileUseCase } from "@/use-cases/users";
import { cache } from "react";

export const getUserProfileLoader = cache(getUserProfileUseCase);
