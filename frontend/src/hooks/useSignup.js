import { useState } from "react";
import React from "react";
import { useAuthContext } from "./useAuthContext";

export default function useSignup() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsPending(true);
    setError(null);

    const response = await fetch("/api/user/Signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError(json.error);
    }
    if (response.ok) {
      setIsPending(false);
      //save user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update auth context
      dispatch({ type: "LOGIN", payload: json });
    }
  };
  return { signup, isPending, error };
}
