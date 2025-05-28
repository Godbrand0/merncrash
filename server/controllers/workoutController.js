const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// Create and Save a new Workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all workouts

const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

// get single workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid workout id" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }

  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
};
