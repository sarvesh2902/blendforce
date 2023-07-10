const express = require("express");
const router = express.Router();

const jobsController = require("../controllers/jobs.controllers");




router.post("/create", jobsController.addJobData);

router.post("/analysis", jobsController.provideOpenJobCandidateData);

module.exports = router;