import { workStatusSchema } from "@/app/(auth)/complete-profile/schema";
import z from "zod";

export type WorkStatusIndex = z.infer<typeof workStatusSchema>;
