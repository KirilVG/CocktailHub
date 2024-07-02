import { pino } from "pino"
import * as fs from "node:fs";
import path from "node:path";

const logsDir = "./server/logs";
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const streams = [
    {
        level: "info",
        stream: fs.createWriteStream(path.join(logsDir, "app.log"), { flags: "a" }),
    },
    {
        level: "error",
        stream: fs.createWriteStream(path.join(logsDir, "error.log"), { flags: "a" }),
    },
];

export const logger = pino(
    {
        level: "debug",
    },
    pino.multistream(streams),
);
