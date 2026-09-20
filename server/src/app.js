import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import gatePassRoutes from "./routes/gatePassRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";
import rateLimit from "express-rate-limit";
import {
  notFoundMiddleware,
  errorMiddleware,
} from "./middlewares/errorMiddleware.js";


const app = express();
/* =========================================
   RATE LIMITING
========================================= */

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 500,

  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },

  standardHeaders: true,

  legacyHeaders: false,
});

/* =========================================
   GLOBAL MIDDLEWARE
========================================= */

const allowedOrigins = [
  "http://localhost:5173",
  "https://gate-pass-system-eight.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({
  extended: true,
}));

app.use("/api", apiLimiter);

/* =========================================
   HEALTH CHECK
========================================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Raymond Gate Pass Management System API is running",
  });
});


/* =========================================
   API ROUTES
========================================= */

app.use("/api/auth", authRoutes);

app.use("/api/gate-passes", gatePassRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/reports", reportRoutes);
app.use("/api/export", exportRoutes);
/* =========================================
   404 HANDLER
========================================= */

app.use(notFoundMiddleware);


/* =========================================
   GLOBAL ERROR HANDLER
========================================= */

app.use(errorMiddleware);


export default app;