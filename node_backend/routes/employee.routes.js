var express = require("express");
var router = express.Router();
const Employee = require("../models/employee");
const JobsSchema = require("../models/JobsSchema");
const multer = require("multer");
const Papa = require("papaparse");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });
const csv = require("csv-parser");

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

    const departmentCounts = await Employee.aggregate([
      { $match: {} },
      { $group: { _id: "$department", count: { $sum: 1 } } },
    ]);

    console.log(departmentCounts);

    res.status(200).json({
      genderCounts,
      ethnicityCounts,
      sexualOrientationCounts,
      lgbtqCounts,
      disabilityCounts,
      indigenousCounts,
      departmentCounts,
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

router.get("/get-all-employees", async (req, res) => {
  try {
    const employees = await Employee.find({}, "name department position").limit(
      50
    );
    res.status(200).json(employees);
  } catch (e) {
    console.error(error);
    res.status(500).json({ error: "Failed to get employees" });
  }
});

router.get("/download-employees-csv", async (req, res) => {
  try {
    const employees = await Employee.find({});
    const employeeData = employees.map((employee) => {
      const { _id, ...rest } = employee.toObject();
      return Object.entries(rest).reduce((acc, [key, value]) => {
        if (typeof value === "object") {
          acc[key] = JSON.stringify(value);
        } else {
          acc[key] = value;
        }
        return acc;
      }, {});
    });

    // Convert employeeData to CSV format with custom transform function
    const csv = Papa.unparse(employeeData, {
      transform: (value, field) =>
        value === null || value === undefined ? "" : value,
    });

    // Set response headers for file download
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=employees.csv");

    // Send the CSV data as the response
    res.status(200).send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to download employees CSV" });
  }
});

// Route to import CSV file
// router.post("/import-employee-dataset", upload.single("file"), (req, res) => {
//   const file = req.file;
//   if (!file) {
//     return res.status(400).send("No file uploaded.");
//   }

//   const employees = [];
//   fs.createReadStream(file.path)
//     .pipe(csv())
//     .on("data", (data) => {
//       employees.push(data);
//     })
//     .on("end", () => {
//       // Remove existing employees from the collection
//       Employee.deleteMany({}, (err) => {
//         if (err) {
//           return res.status(500).send("Failed to delete existing employees.");
//         }

//         // Insert new employees from the CSV file
//         Employee.insertMany(employees, (err) => {
//           if (err) {
//             return res.status(500).send("Failed to import employees.");
//           }

//           res.send("Employees imported successfully.");
//         });
//       });
//     });
// });

module.exports = router;
