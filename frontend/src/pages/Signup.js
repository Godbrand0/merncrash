import React, { useState } from "react";
import useSignup from "../hooks/useSignup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const { signup, error, isPending } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, Password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign up</h3>

      <label>Email</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={Password}
      />

      <button disabled={isPending}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
