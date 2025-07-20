// src/controllers/jobController.ts
import { Request, Response } from "express";
import prisma from "../prisma";
import { scheduleJob } from "../services/scheduler";

export async function getAllJobs(req: Request, res: Response) {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    return res.status(500).json({
      error: err,
      message: "An internal server error occurred while retrieving jobs",
    });
  }
}

export async function getJobById(req: Request, res: Response) {
  const jobId = Number(req.params.id);
  try {
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    return res.json(job);
  } catch (err) {
    return res.status(500).json({ error: "Could not fetch job" });
  }
}

export async function createJob(req: Request, res: Response) {
  const { name, schedule, payload } = req.body;
  try {
    let nextRun: Date | null = null;
    try {
      const parser = await import("cron-parser");
      const interval = parser.default.parse(schedule);
      nextRun = interval.next().toDate();
    } catch {
      console.warn("Failed to compute next run time");
    }
    const newJob = await prisma.job.create({
      data: { name, schedule, payload, lastRun: null, nextRun },
    });
    scheduleJob(newJob);
    return res.status(201).json(newJob);
  } catch (err) {
    return res.status(500).json({ error: "Could not create job" });
  }
}
