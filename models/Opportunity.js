const mongoose = require("mongoose");

const OpportunitySchema = new mongoose.Schema({
  primary_key: {
    type: String,
  },
  job_title: {
    type: String,
  },
  company_name: {
    type: String,
  },
  job_url: {
    type: String,
  },
});

module.exports = mongoose.model("Opportunity", OpportunitySchema);
