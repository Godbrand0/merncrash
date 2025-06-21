import React, { useState } from "react";
import useLogin from "../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, Password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log in</h3>

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

      <button disabled={isPending}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
