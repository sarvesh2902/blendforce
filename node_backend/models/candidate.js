const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  mobile: {
    type: String,
  },
  gender: {
    type: String,
  },
  ethnicity: {
    type: String,
  },
  resume: {
    type: String,
  },
  lastClearedRound: {
    type: Number,
  },
  vendor: {
    type: String,
  },
  department: {
    type: String,
  },
  ats_score: {
    type: Number,
  },
  ats_score: {
    type: Number,
  },
});

const Candidate =
  mongoose.models.Candidate || mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
