const express = require("express");
const { getOpportunities } = require("../controllers/opportunities");
const router = express.Router();

router.route("/").get(getOpportunities);

module.exports = router;
