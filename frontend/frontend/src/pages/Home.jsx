import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="home-content">
        {/* 
        <div className="home-announcement">
          <span className="emoji">🚀</span>
          <span>Introducing NebulaBox 2.0 - Now with AI-powered organization</span>
        </div>
        */}
        <h1>
          Store, sync, and share with <strong>NebulaBox</strong> <span className="emoji">🪐</span>
        </h1>
        
        <p>
          Your smart cloud storage solution designed for modern teams. 
          Collaborate faster and get more done with AI-native file management.
        </p>
        
        <div className="buttons">
          <button className="primary">Get Started</button>
          <button className="secondary">Learn More</button>
        </div>
        
        <div className="home-features">
          <div className="feature">
            <span className="feature-icon">⚡</span>
            <h3>Lightning Fast</h3>
            <p>Upload and sync files at blazing speeds with our optimized infrastructure</p>
          </div>
          
          <div className="feature">
            <span className="feature-icon">🔒</span>
            <h3>Secure by Default</h3>
            <p>End-to-end encryption ensures your files stay private and protected</p>
          </div>
          
          <div className="feature">
            <span className="feature-icon">🤖</span>
            <h3>AI-Powered</h3>
            <p>Smart organization and search powered by advanced machine learning</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;