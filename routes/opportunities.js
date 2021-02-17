const express = require("express");
const { getOpportunities } = require("../controllers/Opportunities");

const Opportunity = require("../models/Opportunity");

const router = express.Router();

router.route("/").get(getOpportunities);

module.exports = router;
