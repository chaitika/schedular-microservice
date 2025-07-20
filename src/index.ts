import express from "express";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes";
import { initializeScheduler } from "./services/scheduler";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://127.0.0.1:8080", // Frontend dev server
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());
app.use("/jobs", jobRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await initializeScheduler();
  console.log("Scheduler initialized with existing jobs");
});
