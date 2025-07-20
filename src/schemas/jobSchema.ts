// src/schemas/jobSchema.ts
import { z } from "zod";
import cron from "node-cron";

export const jobSchema = z.object({
  name: z.string().min(1, "Job name is required"),
  schedule: z.string().refine((val) => cron.validate(val), {
    message: "Invalid cron schedule format",
  }),
  payload: z.any().optional(),
});
