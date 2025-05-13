import React, { useState } from 'react';
import './LandingPage.css';
import TestimonialForm from './TestimonialForm';

const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="landing-page">
      <div className="hero">
        <div className="container">
          <h1>Welcome to Heritage Drive</h1>
          <p className="hero-text">
            Experience exceptional professional driving services tailored to your needs.
            Join our community of satisfied clients and share your journey with us.
          </p>
          <button 
            className="button"
            onClick={() => setIsModalOpen(true)}
          >
            Submit Your Story
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <TestimonialForm onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </main>
  );
};

export default LandingPage; 