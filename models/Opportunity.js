const mongoose = require("mongoose");

const OpportunitySchema = new mongoose.Schema({
  primary_key: {
    type: String,
    trim: true,
  },
  job_title: {
    type: String,
    trim: true,
  },
  company_name: {
    type: String,
    trim: true,
  },
  job_url: {
    type: String,
    trim: true,
  },
  job_source: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Opportunity", OpportunitySchema);
