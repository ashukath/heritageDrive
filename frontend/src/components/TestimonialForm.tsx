import React, { useState } from 'react';
import './TestimonialForm.css';

interface TestimonialFormProps {
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  rating: number;
  message: string;
  consentGiven: boolean;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  rating?: string;
  message?: string;
  submit?: string;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    rating: 5,
    message: '',
    consentGiven: false
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Please share your story';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    console.log('Submitting form data:', formData); // Debug log

    try {
      const formDataObj = new FormData();
      
      // Add photo first if selected
      const photoInput = document.querySelector<HTMLInputElement>('#photo');
      if (photoInput?.files?.[0]) {
        formDataObj.append('photo', photoInput.files[0]);
        console.log('Adding photo to request:', photoInput.files[0].name);
      }

      // Add testimonial data as a Blob with proper content type
      const testimonialBlob = new Blob([JSON.stringify(formData)], {
        type: 'application/json'
      });
      formDataObj.append('testimonial', testimonialBlob);
      
      console.log('Sending form data with following entries:');
      for (const pair of formDataObj.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await fetch('http://localhost:8080/api/testimonials', {
        method: 'POST',
        body: formDataObj,
      });

      console.log('Response status:', response.status); // Debug log

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Server error response:', errorData); // Debug log
        throw new Error(errorData || 'Failed to submit testimonial');
      }

      const responseData = await response.json();
      console.log('Success response:', responseData); // Debug log

      setShowSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      console.error('Submission error:', err); // Debug log
      setErrors({ 
        submit: err instanceof Error ? err.message : 'Failed to submit your story. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    console.log(`Field ${name} changed to:`, newValue); // Debug log
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (showSuccess) {
    return (
      <div className="success-message">
        <h2>Thank You!</h2>
        <p>We truly appreciate you taking the time to share your experience with us. 
           Clients like you make our journey meaningful and inspire us to continue delivering excellence.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="testimonial-form">
      <h2>Share Your Story</h2>
      
      <div className="form-group">
        <label htmlFor="name" className="form-label">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          className={`form-input ${errors.name ? 'error' : ''}`}
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          className={`form-input ${errors.email ? 'error' : ''}`}
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="rating" className="form-label">Rating (1-5) *</label>
        <input
          type="number"
          id="rating"
          name="rating"
          className={`form-input ${errors.rating ? 'error' : ''}`}
          min="1"
          max="5"
          value={formData.rating}
          onChange={handleChange}
          required
        />
        {errors.rating && <span className="error-message">{errors.rating}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">Your Story *</label>
        <textarea
          id="message"
          name="message"
          className={`form-input ${errors.message ? 'error' : ''}`}
          value={formData.message}
          onChange={handleChange}
          rows={4}
          required
        />
        {errors.message && <span className="error-message">{errors.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="photo" className="form-label">Photo (Optional)</label>
        <input
          type="file"
          id="photo"
          name="photo"
          className="form-input"
          accept="image/*"
        />
        <small className="form-help">Share a photo related to your experience (max 10MB)</small>
      </div>

      <div className="form-group">
        <label className="form-checkbox">
          <input
            type="checkbox"
            name="consentGiven"
            checked={formData.consentGiven}
            onChange={handleChange}
            required
          />
          <span>I consent to share my story publicly *</span>
        </label>
      </div>

      {errors.submit && <p className="error-message">{errors.submit}</p>}

      <div className="form-actions">
        <button type="button" className="button button-secondary" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="button" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Story'}
        </button>
      </div>
    </form>
  );
};

export default TestimonialForm; 