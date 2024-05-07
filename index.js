const winston = require("winston");
const todoSequelize = require("./src/database/setup/database");
const app = require("./src/server");

require("dotenv").config();

// Zugriff auf Umgebungsvariablen
// const { PORT } = process.env;
const PORT = process.env.PORT;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info", // Log-Level
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

todoSequelize
  .sync()
  .then(() => {
    logger.info("DB has been successfully initialized");
  })
  .catch((e) => {
    logger.error(`Error initializing DB: ${e.message}`);
  });

// App hört im folgenden auf den Port, welcher über die Umgebungsvariable definiert ist
app.listen(process.env.PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT}`);
});
