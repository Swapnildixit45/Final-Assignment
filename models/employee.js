const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const employee = new mongoose.Schema(
  {
    name: { type: String, required: false },
    salary: { type: Number, required: false },
    designation: { type: String, required: false },
    city: { type: String, required: false },
    phone_number: { type: Number, required: true },
  },
  { collection: "employee" }
);

const model = mongoose.model("Employee", employee);

module.exports = model;
