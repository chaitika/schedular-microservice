// src/routes/jobRoutes.ts
import { Router } from "express";
import * as jobController from "../controllers/jobController";
import { jobSchema } from "../schemas/jobSchema";

const router = Router();

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get all jobs
 *     responses:
 *       200:
 *         description: List of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Test Job Every 10 Seconds"
 *                   schedule:
 *                     type: string
 *                     example: "*\/10 * * * *"
 *                   lastRun:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *                     example: null
 *                   nextRun:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-07-20T13:00:00.000Z"
 *                   payload:
 *                     type: object
 *                     example:
 *                       message: "Hello every 10 seconds!"
 */
router.get("/", jobController.getAllJobs);

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get job by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Test Job Every 10 Seconds"
 *                 schedule:
 *                   type: string
 *                   example: "*\/10 * * * *"
 *                 lastRun:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *                   example: null
 *                 nextRun:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-07-20T13:00:00.000Z"
 *                 payload:
 *                   type: object
 *                   example:
 *                     message: "Hello every 10 seconds!"
 */
router.get("/:id", jobController.getJobById);

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a job
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Test Job Every 10 Seconds"
 *               schedule:
 *                 type: string
 *                 example: "*\/10 * * * *"
 *               payload:
 *                 type: object
 *                 example:
 *                   message: "Hello every 10 seconds!"
 *     responses:
 *       201:
 *         description: Job created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Test Job Every 10 Seconds"
 *                 schedule:
 *                   type: string
 *                   example: "*\/10 * * * *"
 *                 lastRun:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *                   example: null
 *                 nextRun:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-07-20T13:00:00.000Z"
 *                 payload:
 *                   type: object
 *                   example:
 *                     message: "Hello every 10 seconds!"
 */
router.post("/", async (req, res, next) => {
  try {
    const result = jobSchema.safeParse(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ error: "Invalid input", issues: result.error.flatten() });
    }
    req.body = result.data;
    return jobController.createJob(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;
