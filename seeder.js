const fs = require("fs");
const parse = require("csv-parse");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const csvtojson = require("csvtojson");
const csvfilepath = "job_opportunities.csv";

// Load env variables
dotenv.config({ path: "./config/config.env" });

// Load models
const Opportunity = require("./models/Opportunity");
const JobBoard = require("./models/JobBoard");

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Create JSON file
const createOpportunitiesJsonFile = () => {
  csvtojson()
    .fromFile(csvfilepath)
    .then(jsonObj => {
      console.log("jsonObj: ", jsonObj);

      fs.writeFileSync(
        "./data/job_opportunities.json",
        JSON.stringify(jsonObj),
        "utf-8",
        function (err) {
          console.log("err: ", err);
        }
      );
    });
};

// Import opportunities into DB
const importOpportunitiesData = async () => {
  let opportunites = JSON.parse(
    fs.readFileSync("./data/job_opportunities.json", "utf-8")
  );
  opportunites = cleanOpportunityData(opportunites);

  console.log("parsed opportunites: ", opportunites);
  try {
    await Opportunity.create(opportunites);

    console.log("Opportunity data imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Import resolved job boards into DB
const importJobBoardsData = async () => {
  let resolvedJobBoards = JSON.parse(
    fs.readFileSync("./data/resolvedJobBoards.json", "utf-8")
  );
  // resolvedJobBoards = cleanData(resolvedJobBoards);

  console.log("parsed resolvedJobBoards: ", resolvedJobBoards);
  try {
    await JobBoard.create(resolvedJobBoards);

    console.log("JobBoard Data imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Opportunity.deleteMany();

    console.log("Opportunity data destroyed...".red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Clean up data keys
const cleanJobBoardData = data => {
  data.map(obj => {
    // if (obj.hasOwnProperty("ID (primary key)")) {
    obj["primary_key"] = obj["ID (primary key)"].trim();
    delete obj["ID (primary key)"];
    // }
    // if (obj.hasOwnProperty("Job Title")) {
    obj["job_title"] = obj["Job Title"].trim();
    delete obj["Job Title"];
    // }
    // if (obj.hasOwnProperty("Company Name")) {
    obj["company_name"] = obj["Company Name"].trim();
    delete obj["Company Name"];
    // }
    // if (obj.hasOwnProperty("Job URL")) {
    obj["job_url"] = obj["Job URL"].trim();
    delete obj["Job URL"];
    // }
    obj["job_source"] = "";
  });
  return data;
};

// Clean up data keys
const cleanOpportunityData = data => {
  data.map(obj => {
    // if (obj.hasOwnProperty("ID (primary key)")) {
    obj["primary_key"] = obj["ID (primary key)"].trim();
    delete obj["ID (primary key)"];
    // }
    // if (obj.hasOwnProperty("Job Title")) {
    obj["job_title"] = obj["Job Title"].trim();
    delete obj["Job Title"];
    // }
    // if (obj.hasOwnProperty("Company Name")) {
    obj["company_name"] = obj["Company Name"].trim();
    delete obj["Company Name"];
    // }
    // if (obj.hasOwnProperty("Job URL")) {
    obj["job_url"] = obj["Job URL"].trim();
    delete obj["Job URL"];
    // }
    obj["job_source"] = "";
  });
  return data;
};

if (process.argv[2] === "-i") {
  importOpportunitiesData();
} else if (process.argv[2] === "-d") {
  deleteData();
} else if (process.argv[2] === "-c") {
  createOpportunitiesJsonFile();
} else if (process.argv[2] === "-j") {
  importJobBoardsData();
}
