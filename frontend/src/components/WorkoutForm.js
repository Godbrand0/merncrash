import React, { useState } from "react";

export default function WorkoutForm() {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };
    const response = await fetch("/api/workout", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      console.log("workout added", json);
    }
  };
  return (
    <form action="" onSubmit={handleSubmit} className="create">
      <h3>Add a New Workout</h3>
      <label htmlFor="">Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <label htmlFor="">Load (kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />
      <label htmlFor="">Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
