const Opportunity = require("../models/Opportunity");

// @desc    Get all opportunities
// @route   GET /opportunities
// @access  Public
exports.getOpportunities = async (req, res, next) => {
  const allOpportunities = await Opportunity.find();
  res.status(200).json({ data: allOpportunities });
};
