import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './Contact.css';

// Custom inline SVG icons for brands (deprecated in recent lucide-react)
const Github = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: <Mail size={22} />,
      label: "Email",
      value: "srushtikatkar69@gmail.com",
      link: "mailto:srushtikatkar69@gmail.com"
    },
    {
      icon: <Linkedin size={22} />,
      label: "LinkedIn",
      value: "linkedin.com/in/srushti-katkar",
      link: "https://www.linkedin.com/in/srushti-katkar-032936293/"
    },
    {
      icon: <Github size={22} />,
      label: "GitHub",
      value: "github.com/srushti2225",
      link: "https://github.com/srushti2225"
    },
    {
      icon: <MapPin size={22} />,
      label: "Location",
      value: "Ishwarpur, Maharashtra",
      link: "https://maps.google.com/?q=Ishwarpur"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.message) {
    alert("Please fill in all required fields.");
    return;
  }

  setIsSubmitting(true);

  try {
    await emailjs.send(
      'service_3g42miy',
      'template_apnz4ro',
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
      'kexaRGwQ09ssYeD28'
    );

    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  } catch (error) {
    console.error(error);
    alert('Failed to send message');
  }

  setIsSubmitting(false);
};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] }
    }
  };

  return (
    <section id="contact">
      <h2 className="section-title">Let's Connect</h2>

      <div className="contact-layout">
        {/* Left column: Contact cards */}
        <motion.div 
          className="contact-info-column"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {contactInfo.map((info, idx) => (
            <motion.a 
              key={idx} 
              href={info.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card contact-card interactive"
              variants={cardVariants}
            >
              <div className="contact-card-icon-wrapper">
                {info.icon}
              </div>
              <div className="contact-card-details">
                <span className="contact-card-label">{info.label}</span>
                <span className="contact-card-value">{info.value}</span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Right column: Form */}
        <motion.div 
          className="glass-card contact-form-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={formVariants}
        >
          {isSubmitted ? (
            <div className="form-success">
              <div className="success-icon-wrapper">
                <CheckCircle2 size={54} />
              </div>
              <h3 className="success-title">Message Sent!</h3>
              <p className="success-text">
                Thank you for reaching out, Srushti will get back to you as soon as possible.
              </p>
              <button 
                className="outline-btn interactive" 
                style={{ marginTop: '16px' }}
                onClick={() => setIsSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Your Name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Collaborating on a project"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Hey, let's build something awesome together!"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="glow-btn submit-btn interactive"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <Send size={16} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
