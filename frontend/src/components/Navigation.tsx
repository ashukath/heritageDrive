import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    return (
        <nav className="navigation">
            <div className="nav-container">
                <div className="logo">
                    <Link to="/">Heritage Drive</Link>
                </div>
                <div className="nav-items">
                    <div className="dropdown" onMouseEnter={() => setIsAboutOpen(true)} onMouseLeave={() => setIsAboutOpen(false)}>
                        <button className="dropbtn">About Us</button>
                        {isAboutOpen && (
                            <div className="dropdown-content">
                                <Link to="/journey">Our Journey</Link>
                                <Link to="/contact">Contact Us</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation; 