import express, { json, urlencoded, type Application } from 'express';
import dotenv from 'dotenv';
import cors, { type CorsOptions } from 'cors';
import { routes } from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
import { connectDB } from './config/mongoose.js';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import { errorHandler } from './errors/errorHandler.js';
import { JSON_LIMIT } from "./constants/configConstants.js";
import { startScheduleManager } from './config/scheduleManager.js';
import swaggerOutput from './swagger_output.json';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
const corsWhitelist: string[] = process.env.CORS_WHITELIST ? process.env.CORS_WHITELIST.split(',') : [];
const SERVER_ROOT = process.env.SERVER_ROOT || "/gyc";

app.use(json({ limit: JSON_LIMIT }));
app.use(urlencoded({ extended: true }));
connectDB();

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || corsWhitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(mongoSanitize())

app.use( SERVER_ROOT, routes);

app.use( `${SERVER_ROOT}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

startScheduleManager();