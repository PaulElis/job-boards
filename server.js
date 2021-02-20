const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fs = require("fs");
const connectDB = require("./config/db");
const cors = require("cors");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to DB
connectDB();

// Route files
const opportunities = require("./routes/opportunities");
const jobBoards = require("./routes/jobBoards");

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Enable CORS
app.use(cors());

// Mount routers
app.use("/job-boards", jobBoards);
app.use("/opportunities", opportunities);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => process.exit(1));
});
