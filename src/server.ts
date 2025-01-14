import express, { Application, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./modules/student/student.route";
import httpStatus from "http-status";
import globalErrorHandler from "./middlewares/globalErrorHandler";

export const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/student", StudentRoutes);

// Global error handler
app.use(globalErrorHandler);

// Not found handler
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
});
