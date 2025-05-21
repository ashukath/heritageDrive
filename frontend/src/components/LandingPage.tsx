import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import TestimonialForm from './TestimonialForm';

const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2000',
      caption: 'Taj Mahal - Symbol of Eternal Love'
    },
    {
      url: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=2000',
      caption: 'Hawa Mahal - The Pink Palace of Jaipur'
    },
    {
      url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000',
      caption: 'Kerala Backwaters - God\'s Own Country'
    }
  ];

  useEffect(() => {
    setImagesLoaded(new Array(images.length).fill(false));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <main className="landing-page">
      <div className="carousel-section">
        <div className="carousel">
          <div 
            className="carousel-inner" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="carousel-slide">
                {!imagesLoaded[index] && <div className="loading-spinner" />}
                <img 
                  src={image.url} 
                  alt={image.caption} 
                  onLoad={() => handleImageLoad(index)}
                  style={{ opacity: imagesLoaded[index] ? 1 : 0 }}
                />
                {imagesLoaded[index] && (
                  <div className="carousel-caption">
                    <h2>{image.caption}</h2>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="carousel-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="container">
          <h1>Welcome to Heritage Drive</h1>
          <p className="hero-text">
            Experience the rich cultural heritage of India through our curated travel experiences.
            Join our community of passionate travelers and share your journey with us.
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