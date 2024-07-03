// src/pages/AboutUs.jsx
import React from 'react';
//import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-us">
            <header>
                <h1>About Us</h1>
            </header>
            <main>
                <section id="company-history">
                    <h2>Our History</h2>
                    <p>We started our journey in...</p>
                </section>
                <section id="mission-values">
                    <h2>Mission and Values</h2>
                    <p>Our mission is to...</p>
                </section>
                <section id="team">
                    <h2>Meet Our Team</h2>
                    <div className="team-member">
                        <img src="team-member1.jpg" alt="Team Member Name" />
                        <h3>Team Member Name</h3>
                        <p>Role</p>
                    </div>
                    {/* Repeat for other team members */}
                </section>
                <section id="achievements">
                    <h2>Our Achievements</h2>
                    <p>We are proud to have...</p>
                </section>
                <section id="contact">
                    <h2>Contact Us</h2>
                    <p>
                        For inquiries, please email us at{' '}
                        <a href="mailto:info@example.com">info@example.com</a>.
                    </p>
                </section>
            </main>
            <footer>
                <p>&copy; 2024 Your Company Name. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AboutUs;
