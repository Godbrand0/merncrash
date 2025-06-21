import React from "react";
import { useAuthContext } from "./useAuthContext";

export default function useLogout() {
  const { dispatch } = useAuthContext();
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
    dispatch({ type: "LOGOUT" });
  };
  return logout;
}
