//import React from 'react';
import { Container, Box, Typography, Grid, Link } from '@mui/material';

const AboutUs = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            textAlign="center"
            bgcolor="#f5f5f5"
        >
            <Container maxWidth="md">
                <Box py={4}>
                    <Typography variant="h2" component="header" gutterBottom>
                        About Us
                    </Typography>
                    <Box component="main">
                        <Box mb={4} id="company-history">
                            <Typography variant="h4" component="h2" gutterBottom>
                                Our History
                            </Typography>
                            <Typography variant="body1">
                                We started our journey in...
                            </Typography>
                        </Box>
                        <Box mb={4} id="mission-values">
                            <Typography variant="h4" component="h2" gutterBottom>
                                Mission and Values
                            </Typography>
                            <Typography variant="body1">
                                Our mission is to...
                            </Typography>
                        </Box>
                        <Box mb={4} id="team">
                            <Typography variant="h4" component="h2" gutterBottom>
                                Meet Our Team
                            </Typography>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item xs={12} sm={6} md={4}>
                                    <Box className="team-member" textAlign="center">
                                        <img src="team-member1.jpg" alt="Team Member Name" style={{ width: '100%', borderRadius: '50%' }} />
                                        <Typography variant="h6" component="h3">
                                            Team Member Name
                                        </Typography>
                                        <Typography variant="body2">
                                            Role
                                        </Typography>
                                    </Box>
                                </Grid>
                                {/* Repeat for other team members */}
                            </Grid>
                        </Box>
                        <Box mb={4} id="achievements">
                            <Typography variant="h4" component="h2" gutterBottom>
                                Our Achievements
                            </Typography>
                            <Typography variant="body1">
                                We are proud to have...
                            </Typography>
                        </Box>
                        <Box mb={4} id="contact">
                            <Typography variant="h4" component="h2" gutterBottom>
                                Contact Us
                            </Typography>
                            <Typography variant="body1">
                                For inquiries, please email us at{' '}
                                <Link href="mailto:info@example.com">info@example.com</Link>.
                            </Typography>
                        </Box>
                    </Box>
                    <Box component="footer" py={2}>
                        <Typography variant="body2">
                            &copy; 2024 Your Company Name. All rights reserved.
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default AboutUs;
