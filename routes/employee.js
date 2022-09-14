const express = require("express");
const router = express.Router();

const Employee = require("../models/employee");

const verifyAuth = require("../middlewares/auth");
const { json } = require("express");

router.post("/", async (req, res) => {


  try {
    

    const newemployee = new Employee({
      name: req.body.name,
      salary: req.body.salary,
      designaion: req.body.designaion,
      city: req.body.city,
      phone_number: req.body.phone_number,
    });

    const emp = await newemployee.save();
    res.json(emp);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/", verifyAuth, async (req, res) => {
  

  try {
    
    const employee = await Employee.find();

    res.json(employee);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:id",verifyAuth, async (req, res) => {
 
  try {
    const emp = await Employee.findById(req.params.id);
   
    emp.remove();
    res.json({ msg: "Expense removed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
