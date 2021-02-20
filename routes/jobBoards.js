const express = require("express");
const { getJobBoards } = require("../controllers/jobBoards");
const router = express.Router();

router.route("/").get(getJobBoards);

module.exports = router;
