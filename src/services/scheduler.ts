// src/services/scheduler.ts
import cron from "node-cron";
import prisma from "../prisma";
import { Job } from "@prisma/client";

export function scheduleJob(job: Job) {
  try {
    const task = cron.schedule(job.schedule, async () => {
      const jobId = job.id;

      // job execution logic should be here.
      // rn just displaying the jobId and name and optional payload.
      console.log(`Executing job ${jobId} - "${job.name}"`);
      if (job.payload) {
        console.log(`Payload: ${JSON.stringify(job.payload)}`);
      }
      // job execution logic ends here.

      const now = new Date();
      let nextRun: Date | null = null;
      try {
        const parser = await import("cron-parser");
        const interval = parser.default.parse(job.schedule, {
          currentDate: now,
        });
        nextRun = interval.next().toDate();
      } catch {}
      await prisma.job.update({
        where: { id: jobId },
        data: { lastRun: now, nextRun },
      });
    });
    console.log(`Scheduled job ${job.id}: ${job.name} (cron: ${job.schedule})`);
    return task;
  } catch (err) {
    console.error(`Failed to schedule job ${job.id}:`, err);
  }
}

export async function initializeScheduler() {
  const jobs = await prisma.job.findMany();
  jobs.forEach((job) => {
    scheduleJob(job);
  });
}
