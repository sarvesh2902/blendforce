var express = require("express");
var router = express.Router();
const Candidate = require("../models/candidate");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

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

module.exports = router;
