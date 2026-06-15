import express from "express";
import cors from "cors";

import donorRoutes from "./routes/donor.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    app: "HemoDon API",
    version: "1.0.0",
    status: "running"
  });
});

app.use("/api/donors", donorRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

export default app;