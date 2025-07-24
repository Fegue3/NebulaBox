import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CognitoUser } from "amazon-cognito-identity-js";
import userPool from "../auth/cognitoConfig";
import "./ConfirmEmail.css";

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg("");

    const user = new CognitoUser({ Username: email, Pool: userPool });

    user.confirmRegistration(code, true, (err, result) => {
      setIsLoading(false);
      if (err) {
        setMsg(err.message || "Failed to confirm.");
      } else {
        setMsg("✅ Email confirmed! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500); // espera 1.5 segundos

      }
    });
  };

  return (
    <div className="confirm-container">
  <div className="confirm-wrapper">
    <h2 className="confirm-title">Confirm Your Email</h2>
    <form onSubmit={handleConfirm} className="confirm-form">
      <div className="confirm-group">
        <label className="confirm-label">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="confirm-input"
        />
      </div>
      <div className="confirm-group">
        <label className="confirm-label">Confirmation Code</label>
        <input
          type="text"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Code from your email"
          className="confirm-input"
        />
      </div>
      <button type="submit" disabled={isLoading} className="confirm-button">
        {isLoading ? "Confirming..." : "Confirm Email"}
      </button>
      {msg && (
        <p className={`confirm-message ${msg.includes("✅") ? "success" : ""}`}>
          {msg}
        </p>
      )}
    </form>
  </div>
</div>

  );
};

export default ConfirmEmail;
