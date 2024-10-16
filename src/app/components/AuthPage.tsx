"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../styles/Login.css";
import useAuth from "../middleware/authMiddleware";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (true) {
      localStorage.setItem("authToken", "yourAuthToken");
      router.push("/tasks");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome to the portfolio of Agustín Alonso! Please log in to explore my work</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;