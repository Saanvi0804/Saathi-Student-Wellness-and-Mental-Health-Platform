import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../api"; // <-- adjust the path if your api.js is located elsewhere
import "./Auth.css";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Uses your centralized axios instance from api.js
      const response = await apiClient.post("/auth/register", {
        username,
        password,
        role,
      });

      console.log("Signup success:", response.data);
      navigate("/login");
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.response?.data?.msg || "Signup failed.");
    } finally {
      setLoading(false);
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

          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <span className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
