const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
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
  department: {
    type: String,
  },
  position: {
    type: String,
  },
  sexualOrientation: {
    type: String,
  },
  lgbtq: {
    type: String,
  },
  indigenous: {
    type: String,
  },
  disability: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

module.exports = Employee;
