import { useState } from "react";
import { Star } from "lucide-react";
import "./Signup.css";
import userPool from "./cognitoConfig"; 

const Signup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMsg("Passwords don't match");
      return;
    }

    setIsLoading(true);
    setMsg("");

    const attributes = [
      { Name: "email", Value: email },
      { Name: "given_name", Value: firstName },
      { Name: "family_name", Value: lastName },
    ];

    userPool.signUp(email, password, attributes, null, (err, data) => {
      setIsLoading(false);
      if (err) {
        setMsg(err.message || "Signup failed.");
      } else {
        setMsg("Signup successful! Check your email to confirm.");
      }
    });
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        
        <div className="signup-card">
          <div className="signup-header">
            <h1 className="signup-title">Create Account</h1>
            <p className="signup-subtitle">Join NebulaBox and start your journey</p>
          </div>

          <form onSubmit={handleSignup} className="signup-form">
            <div className="name-row">
              <div className="input-group">
                <label htmlFor="firstName" className="input-label">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <label htmlFor="lastName" className="input-label">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email" className="input-label">Email</label>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password" className="input-label">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
              />
            </div>

            <button
              type="submit"
              className={`submit-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>

            {msg && (
              <div className={`message ${msg.includes("successful") ? "success" : "error"}`}>
                {msg}
              </div>
            )}
          </form>

          <div className="signup-footer">
            <p className="footer-text">
              Already have an account?{" "}
              <a href="/login" className="footer-link">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
