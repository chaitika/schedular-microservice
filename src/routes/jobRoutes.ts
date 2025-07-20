// src/routes/jobRoutes.ts
import { Router } from "express";
import * as jobController from "../controllers/jobController";
import { jobSchema } from "../schemas/jobSchema";

const router = Router();

router.get("/", jobController.getAllJobs);

router.get("/:id", jobController.getJobById);

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
