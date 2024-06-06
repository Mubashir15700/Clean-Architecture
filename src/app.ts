import dotenv from "dotenv";
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import express from "express";
import container from "./inversify.config";
import errorHandler from "./middlewares/error-handler";

// Load environment variables from .env file
dotenv.config();

// Create InversifyExpressServer
const server = new InversifyExpressServer(container);

// Configure Express application
server.setConfig((app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
});

// Configure error handling
server.setErrorConfig((app) => {
  app.use(errorHandler);
});

// Build and start the server
const app = server.build();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
