import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, json, errors } = winston.format;

const logger = winston.createLogger({
  level: "info",
  format: combine(
    errors({ stack: true }),
    timestamp(),
    json()
  ),
  transports: [
    // Console (dev-friendly)
    new winston.transports.Console(),

    // Rotating file logs (industry standard)
    new DailyRotateFile({
      dirname: "logs/daily",
      filename: "app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "7d",
      zippedArchive: true,
      maxSize: "20m",
    })
  ],
  exceptionHandlers: [
    new DailyRotateFile({
      dirname: "logs/daily",
      filename: "exceptions-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "7d",
      zippedArchive: true,
      maxSize: "20m",
    })
  ],
  rejectionHandlers: [
    new DailyRotateFile({
      dirname: "logs/daily",
      filename: "rejections-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "7d",
      zippedArchive: true,
      maxSize: "20m",
    })
  ]
});

export default logger;
