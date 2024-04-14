const express = require("express");
const Staf = require("../models/staf");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Staf.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (
      workType === "manager" ||
      workType === "waiter" ||
      workType === "chef"
    ) {
      const data = await Staf.find({ work: workType });
      console.log("data fetched as work type");
      res.status(200).json(data);
    } else {
      console.log("data isn't find as per your request");
      res.status(404).json({ error: "invalid work Type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const newStaf = new Staf(data);
    // save the newStaf in database
    const savedStaf = await newStaf.save();
    console.log("data is saved ", savedStaf);
    res.status(200).json(savedStaf);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const stafId = req.params.id;
    const updatedData = req.body;
    const updatedStafData = await Staf.findByIdAndUpdate(stafId, updatedData, {
      new: true, //for returning updated data
      runValidators: true, //for run mongoose validation
    });
    if (!updatedStafData) {
      return res.status(404).json({ error: "staf not found" });
    }
    console.log("data updated");
    res.status(200).json(updatedStafData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const stafId = req.params.id;
    const deletedStaf = await Staf.findByIdAndDelete(stafId, {
      new: true,
      runValidators: true,
    });

    if (!deletedStaf) {
      return res.status(404).json({ error: "staf not found" });
    }
    console.log("data updated");
    res.status(200).json(deletedStaf);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
