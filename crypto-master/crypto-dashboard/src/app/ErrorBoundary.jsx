import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state taake next render mein fallback UI dikhe
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Yahan aap error ko Sentry ya kisi logging service par bhej sakte hain
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    // State reset karne ka logic
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // Pro Fallback UI
      return (
        <div className="error-fallback-container">
          <div className="error-card">
            <span style={{ fontSize: "3rem" }}>⚠️</span>
            <h3>Oops! Something went sideways.</h3>
            <p>The Crypto Terminal encountered an unexpected error.</p>
            
            {/* Optional: Dev mode mein error message dikhana */}
            <pre className="error-details">
              {this.state.error?.message}
            </pre>

            <button 
              className="retry-btn"
              onClick={handleReset}
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}