var express = require("express");
var router = express.Router();
const Employee = require("../models/employee");
const JobsSchema = require("../models/JobsSchema");

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

router.post("/get-employees-dept", async (req, res) => {
  try {
    const { department } = req.body;
    const employees = await Employee.find({ department });

    const genderCounts = await Employee.aggregate([
      { $match: { department } },
      { $group: { _id: "$gender", count: { $sum: 1 } } },
    ]);

    const ethnicityCounts = await Employee.aggregate([
      { $match: { department } },
      { $group: { _id: "$ethnicity", count: { $sum: 1 } } },
    ]);

    const sexualOrientationCounts = await Employee.aggregate([
      { $match: { department } },
      { $group: { _id: "$sexualOrientation", count: { $sum: 1 } } },
    ]);

    const lgbtqCounts = await Employee.aggregate([
      { $match: { department } },
      { $group: { _id: "$lgbtq", count: { $sum: 1 } } },
    ]);

    const disabilityCounts = await Employee.aggregate([
      { $match: { department } },
      { $group: { _id: "$disability", count: { $sum: 1 } } },
    ]);

    const indigenousCounts = await Employee.aggregate([
      { $match: { department } },
      { $group: { _id: "$indigenous", count: { $sum: 1 } } },
    ]);

    res
      .status(200)
      .json({
        genderCounts,
        ethnicityCounts,
        sexualOrientationCounts,
        lgbtqCounts,
        disabilityCounts,
        indigenousCounts,
      });
  } catch (e) {
    console.error(error);
    res.status(500).json({ error: "Failed to get employees" });
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

module.exports = router;
