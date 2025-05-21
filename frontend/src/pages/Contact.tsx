import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

interface ContactForm {
    name: string;
    email: string;
    phone: string;
    comments: string;
}

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<ContactForm>({
        name: '',
        email: '',
        phone: '',
        comments: ''
    });

    const [submitStatus, setSubmitStatus] = useState<{
        success?: boolean;
        message?: string;
    }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus({}); // Clear previous status
        
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/contact`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            setSubmitStatus({
                success: true,
                message: 'Thank you for your message! We will get back to you soon.'
            });
            
            setFormData({
                name: '',
                email: '',
                phone: '',
                comments: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus({
                success: false,
                message: 'Sorry, there was an error submitting your message. Please try again.'
            });
        }
    };

    return (
        <div className="contact-container">
            <div className="contact-content">
                <h1>Contact Us</h1>
                <div className="contact-form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="comments">Comments</label>
                            <textarea
                                id="comments"
                                name="comments"
                                value={formData.comments}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-btn">Submit</button>
                    </form>
                    {submitStatus.message && (
                        <div className={`status-message ${submitStatus.success ? 'success' : 'error'}`}>
                            {submitStatus.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact; 