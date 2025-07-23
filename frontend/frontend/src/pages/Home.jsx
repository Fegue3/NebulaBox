import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h1>
        Welcome to <strong>NebulaBox</strong> <span className="emoji">🌥️</span>
      </h1>
      <p>Your smart cloud storage solution. Store, sync, and share your files securely from anywhere.</p>
      <div className="buttons">
        <button className="primary">Get Started</button>
        <button className="secondary">Learn More</button>
      </div>
    </div>
  );
}

export default Home;
