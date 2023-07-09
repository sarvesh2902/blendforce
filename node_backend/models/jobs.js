const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  position: {
    type: String,
  },
  desc: {
    type: String,
  },
  type: {
    type: String,
  },
  compensation: {
    type: String,
  },
  deadline: {
    type: String,
  },
});

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

module.exports = Job;
