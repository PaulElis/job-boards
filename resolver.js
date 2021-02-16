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

// Update job_source in DB
const updateJobSource = async (id, body) => {
  const updatedOpportunity = await Opportunity.findOneAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
};

// Main resolver function
const resolver = async () => {
  // Load opportunities
  const allOpportunities = await Opportunity.find();

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
      } else if (i === rootDomains.length - 1 && url.includes(company_name)) {
        updateJobSource(
          { _id: opportunity["_id"] },
          { job_source: "Company Website" }
        );
        // Unknown Job Source
      } else if (i === rootDomains.length - 1 && !url.includes(company_name)) {
        updateJobSource({ _id: opportunity["_id"] }, { job_source: "Unknown" });
      }
    }
  });
  console.log("Job Source data resolved!".green.inverse);
};

resolver();
