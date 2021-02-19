const mongoose = require("mongoose");

const JobBoardSchema = new mongoose.Schema({
  name: {
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
