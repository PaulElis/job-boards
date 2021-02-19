const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env variables
dotenv.config({ path: "./config/config.env" });

// Load models
const Opportunity = require("./models/Opportunity");

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Create rootDomains array
let jobBoards = JSON.parse(fs.readFileSync("jobBoards.json", "utf-8"));
const rootDomains = jobBoards.map(jobBoard => {
  return jobBoard["root_domain"];
});

// Create Job Boards JSON File
const createJobBoardsJSONFile = async () => {
  const allOpportunities = await Opportunity.find();

  // Create local list to populate JSON file
  const resolvedJobBoardsList = rootDomains.map(domain => {
    return {
      [domain]: 0,
      data: [],
    };
  });

  // Add Company Website and Unknown properties to local list
  resolvedJobBoardsList.push(
    {
      "Company Website": 0,
      data: [],
    },
    {
      Unknown: 0,
      data: [],
    }
  );

  // Populate local list with Opportunity count and Opportunity data
  const populateJobBoardsList = opportunity => {
    const opportunityDomain = opportunity.job_source;

    const foundResolvedJobBoard = resolvedJobBoardsList.find(jobBoard => {
      return Object.keys(jobBoard)[0] === opportunityDomain;
    });

    if (foundResolvedJobBoard) {
      foundResolvedJobBoard[opportunityDomain]++;
      foundResolvedJobBoard.data.push(opportunity);
    }
  };

  // Resolve Opportunity, if it is => A Job Board, Company Website or Unknown
  allOpportunities.forEach(opportunity => {
    let company_name = opportunity["company_name"];
    let url = opportunity["job_url"];

    for (let i = 0; i < rootDomains.length; i++) {
      const domain = rootDomains[i];
      // From JobBoards
      if (url.includes(domain)) {
        populateJobBoardsList(opportunity);
        break;
        // From Company Website
      } else if (i === rootDomains.length - 1 && url.includes(company_name)) {
        populateJobBoardsList(opportunity);
        break;
        // Unknown Job Source
      } else if (i === rootDomains.length - 1 && !url.includes(company_name)) {
        populateJobBoardsList(opportunity);
        break;
      }
    }
  });
  console.log("resolvedJobBoardsList: ", resolvedJobBoardsList);
  outputToJSONFile(resolvedJobBoardsList);
};

// Create Resolved Job Boards List JSON file
const outputToJSONFile = jsonObj => {
  fs.writeFileSync(
    "resolvedJobBoards.json",
    JSON.stringify(jsonObj),
    "utf-8",
    function (err) {
      console.log("err: ", err);
    }
  );
  console.log("resolvedJobBoards.json file created!".green.inverse);
};

// Main resolver function
const resolveJobSourcesInDB = async () => {
  // Load opportunities
  const allOpportunities = await Opportunity.find();

  // Update job_source in DB
  const updateJobSource = async (id, body) => {
    await Opportunity.findOneAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
  };

  // Resolve job_source in DB
  allOpportunities.forEach(opportunity => {
    let company_name = opportunity["company_name"];
    let url = opportunity["job_url"];

    for (let i = 0; i < rootDomains.length; i++) {
      const domain = rootDomains[i];
      // Has no Url
      if (url === "") break;
      // From JobBoards
      if (url.includes(domain)) {
        updateJobSource({ _id: opportunity["_id"] }, { job_source: domain });
        break;
        // From Company Website
      } else if (
        i === rootDomains.length - 1 &&
        url.includes(company_name.split(" ").join("").toLowerCase())
      ) {
        updateJobSource(
          { _id: opportunity["_id"] },
          { job_source: "Company Website" }
        );
        break;
        // Unknown Job Source
      } else if (i === rootDomains.length - 1 && !url.includes(company_name)) {
        updateJobSource({ _id: opportunity["_id"] }, { job_source: "Unknown" });
        break;
      }
    }
  });
  console.log("Job Source data resolved!".green.inverse);
};

if (process.argv[2] === "-r") {
  resolveJobSourcesInDB();
} else if (process.argv[2] === "-c") {
  createJobBoardsJSONFile();
}
