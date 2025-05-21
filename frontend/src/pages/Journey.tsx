import React from 'react';
import './Journey.css';

const Journey: React.FC = () => {
    return (
        <div className="journey-container">
            <div className="journey-content">
                <h1>Our Journey</h1>
                <div className="coming-soon">
                    <h2>Coming Soon</h2>
                    <p>We're working on something exciting! Check back later to learn about our journey.</p>
                </div>
            </div>
        </div>
    );
};

export default Journey; 