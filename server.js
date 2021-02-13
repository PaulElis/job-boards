const express = require("express");
const parse = require("csv-parse");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fs = require("fs");
const connectDB = require("./config/db");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to DB
connectDB();

// const csvData = [];

// // Get CSV data
// fs.createReadStream(__dirname + "/job_opportunities.csv")
//   .pipe(
//     parse({
//       delimiter: ",",
//     })
//   )
//   .on("data", dataRow => {
//     csvData.push(dataRow);
//   })
//   .on("end", () => {
//     console.log("Success: ", csvData.length, " items in csvData");
//   });

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

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
