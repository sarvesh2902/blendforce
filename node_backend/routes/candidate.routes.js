var express = require("express");
var router = express.Router();
const Candidate = require("../models/candidate");
const multer = require("multer");
const fs = require("fs");
const mongoose = require('mongoose');
const path = require("path");
const JobsSchema = require("../models/JobsSchema");

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

router.post(
  "/save-profile",
  upload.single("resume"),
  async function (req, res, next) {
    try {
      // Access form fields
      const { name, email, mobile, gender, ethnicity } = req.body;

      // Access uploaded file
      const resumeFile = req.file.path;

      const candidate = await Candidate.findOne({ email });
      if (candidate) {
        await Candidate.findOneAndUpdate(
          { email },
          { name, mobile, gender, ethnicity, resume: resumeFile }
        );
      } else {
        const newCandidate = new Candidate({
          name,
          email,
          mobile,
          gender,
          ethnicity,
          resume: resumeFile,
        });
        await newCandidate.save();
      }

      res.status(200).json({ message: "Success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to authenticate" });
    }
  }
);

router.get("/get-all-jobs", async (req, res) => {
  try {
    const jobs = await JobsSchema.find({});
    console.log(jobs);
    res.status(200).json(jobs);
  } catch (e) {
    console.error(error);
    res.status(500).json({ error: "Failed to get jobs" });
  }
});

router.post("/get-candidate-details", async (req, res) => {
  try {
    const { email } = req.body;
    const candidate = await Candidate.findOne({ email });
    res.status(200).json(candidate);
  } catch (e) {
    console.error(error);
    res.status(500).json({ error: "Failed to get candidate" });
  }
});

router.post("/apply-job", async (req, res) => {
  try {
    const { jobId, candidateId } = req.body;
    const candidate = await JobsSchema.findById(jobId, "applications");
    candidate.applications.push(candidateId);
    candidate.save();
    res.status(200).json(candidate);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to get candidate" });
  }
});


router.post("/updateRound", async (req, res) => {
  try {
    let {candidateId,round} = req.body;
    console.log(req.body);
    const candidate = await Candidate.findOneAndUpdate({"_id":mongoose.Types.ObjectId(candidateId)},{
      lastClearedRound: ++round
    });
    res.status(200).json(candidate);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to get candidate" });
  }
});

module.exports = router;
