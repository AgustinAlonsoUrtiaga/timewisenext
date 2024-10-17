'use client';
import "../styles/Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      <h2 className="title">Contact Me</h2>
      
      <div className="contact-info">
        <p><strong>Name:</strong> Agustin Alonso Urtiaga</p>
        <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/agustin-alonso-urtiaga-116455195" target="_blank">Linked In</a></p>
        <p><strong>GitHub:</strong> <a href="https://github.com/AgustinAlonsoUrtiaga" target="_blank">Github</a></p>
      </div>

      <div className="cv-section">
        <h3 className="title">My CV</h3>
        <iframe
          src="/cv/my-cv.pdf"
          className="cv-frame"
          title="My CV"
        />
      </div>
    </div>
  );
}