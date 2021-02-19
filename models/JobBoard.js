const mongoose = require("mongoose");

const JobBoardSchema = new mongoose.Schema({
  domain: {
    type: String,
    trim: true,
  },
  count: {
    type: Number,
  },
  data: {
    type: Array,
  },
});

module.exports = mongoose.model("JobBoard", JobBoardSchema);
