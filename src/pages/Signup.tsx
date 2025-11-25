import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Read backend API URL from Vite environment variable
  const BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(`${BASE_URL}/auth/signup`, {
        username,
        password,
        role,
      });

      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src="/golu.gif" alt="Mascot" className="auth-mascot" />
        <h1>Signup for Saathi</h1>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Signup</button>
        </form>

        <span className="auth-link">
          Already have an account? <a href="/login">Login here</a>
        </span>
      </div>
    </div>
  );
};

export default Signup;
