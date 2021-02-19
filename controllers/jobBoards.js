const JobBoard = require("../models/JobBoard");

// @desc    Get all jobBoards
// @route   GET /job-boards
// @access  Public
exports.getJobBoards = async (req, res, next) => {
  const allJobBoards = await JobBoard.find();
  res.status(200).json({ data: allJobBoards });
};
