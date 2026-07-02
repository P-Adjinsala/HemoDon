import express from "express";
import cors from "cors";

// Routes
import donorRoutes from "./routes/donor.routes";
import donationRoutes from "./routes/donation.routes";
import hospitalRoutes from "./routes/hospital.routes";
import requestRoutes from "./routes/request.routes";
import stockRoutes from "./routes/stock.routes";

import userRoutes from "./routes/user.routes";
import roleRoutes from "./routes/role.routes";
import notificationRoutes from "./routes/notification.routes";
import logRoutes from "./routes/log.routes";
import unitRoutes from "./routes/unit.routes";

// Associations Sequelize
import "./models/associations";

const app = express();

/* ============================================================================
   Middlewares
============================================================================ */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ============================================================================
   Health Check
============================================================================ */

app.get("/", (_req, res) => {
  res.status(200).json({
    app: "HemoDon API",
    version: "1.0.0",
    status: "running"
  });
});

/* ============================================================================
   API Status
============================================================================ */

app.get("/api/status", (_req, res) => {
  res.status(200).json({
    success: true,
    api: "online"
  });
});

/* ============================================================================
   Routes
============================================================================ */

// Existing routes
app.use("/api/donors", donorRoutes);

app.use("/api/donations", donationRoutes);

app.use("/api/hospitals", hospitalRoutes);

app.use("/api/requests", requestRoutes);

app.use("/api/stocks", stockRoutes);

// New routes
app.use("/api/users", userRoutes);

app.use("/api/roles", roleRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/logs", logRoutes);

console.log("✅ UNIT ROUTE REGISTERED");
app.use("/api/units", unitRoutes);

/* ============================================================================
   Debug
============================================================================ */

app.get("/debug-hemodon", (_req, res) => {
  res.status(200).json({
    source: "backend/src/app.ts"
  });
});

/* ============================================================================
   404 Handler
============================================================================ */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

export default app;