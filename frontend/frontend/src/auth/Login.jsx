import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h2 className="login-title">Welcome back</h2>
            <p className="login-subtitle">Log in to your NebulaBox account</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="login-input-group">
              <label className="login-label" htmlFor="email">Email</label>
              <input
                className="login-input"
                type="email"
                id="email"
                placeholder="john@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login-input-group">
              <label className="login-label" htmlFor="password">Password</label>
              <input
                className="login-input"
                type="password"
                id="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="login-button">Login</button>

            {error && <div className="login-error">{error}</div>}
          </form>

          <div className="login-footer">
            Don’t have an account?
            <a href="/signup"> Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
