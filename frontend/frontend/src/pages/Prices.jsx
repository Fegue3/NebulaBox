import "./Prices.css";

export default function PricingPage() {
  return (
    <div className="pricing-container">
      <h1 className="pricing-title">Choose your plan</h1>
      <div className="pricing-cards">
        {/* Free Plan */}
        <div className="card">
          <h2>🚀 Free</h2>
          <p className="price">€0 / month</p>
          <ul>
            <li>8 GB of storage</li>
            <li>Max. 150MB per file</li>
            <li>1 user</li>
            <li>Secure uploads</li>
            <li className="disabled">Email notifications</li>
            <li className="disabled">Smart Memories (AI)</li>
          </ul>
          <button className="subscribe">Start for Free</button>
        </div>

        {/* Pro Plan */}
        <div className="card highlighted">
          <h2>⭐ Pro</h2>
          <p className="price">€6.99 / month</p>
          <ul>
            <li>100 GB of storage</li>
            <li>Max. 1GB per file</li>
            <li>1 user</li>
            <li>Secure uploads</li>
            <li>QR Sharing</li>
            <li>Smart Memories (AI)</li>
          </ul>
          <button className="subscribe">Subscribe Pro</button>
        </div>

        {/* Teams Plan */}
        <div className="card">
          <h2>👥 Teams</h2>
          <p className="price">€29.99 / month</p>
          <ul>
            <li>1 TB of storage</li>
            <li>Max. 5GB per file</li>
            <li>Up to 5 users</li>
            <li>Secure uploads</li>
            <li>Notifications + QR Sharing</li>
            <li>Smart Memories (AI)</li>
          </ul>
          <button className="subscribe">Team Plan</button>
        </div>
      </div>
    </div>
  );
}
