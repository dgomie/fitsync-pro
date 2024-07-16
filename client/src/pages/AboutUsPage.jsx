import React from 'react';
import { Container, Box, Typography, Grid, Link, Paper, Avatar } from '@mui/material';

const AboutUs = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="105vh"
            textAlign="center"

            p={{ xs: 2, sm: 4, md: 10 }}
        >
            <Container maxWidth="lg">
                <Paper elevation={3} sx={{ padding: { xs: 2, sm: 4, md: 6 }, marginTop: '20px' }}>
                    <Typography variant="h2" component="header" gutterBottom>
                        About Fitsync-PRO
                    </Typography>
                    <Box component="main">
                        <Box mb={4} id="company-history">
                            <Typography variant="h4" component="h2" gutterBottom>
                                Our History
                            </Typography>
                            <Typography variant="body1">
                                Fitsync-PRO started its journey in...
                            </Typography>
                        </Box>
                        <Box mb={4} id="mission-values">
                            <Typography variant="h4" component="h2" gutterBottom>
                                Mission and Values
                            </Typography>
                            <Typography variant="body1">
                                Our mission is to promote a healthy and active lifestyle by providing
                                innovative fitness solutions that inspire and motivate individuals to achieve their fitness goals.
                            </Typography>
                        </Box>
                        <Box mb={4} id="team">
                            <Typography variant="h4" component="h2" gutterBottom>
                                Meet Our Team
                            </Typography>
                            <Grid container spacing={4} justifyContent="center">
                                <Grid item xs={12} sm={6} md={4}>
                                    <Box textAlign="center">
                                        <Avatar
                                            alt="Daniel Gomez"
                                            src="/src/images/danscat.jpg"
                                            sx={{
                                                width: { xs: 100, sm: 120 },
                                                height: { xs: 100, sm: 120 },
                                                margin: '0 auto',
                                                transition: 'transform 0.3s',
                                                '&:hover': {
                                                    transform: 'scale(1.1)',
                                                },
                                            }}
                                        />
                                        <Typography variant="h6" component="h3" mt={2}>
                                            Daniel Gomez
                                        </Typography>
                                        <Typography variant="body2">
                                            Back-end Developer
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Box textAlign="center">
                                        <Avatar
                                            alt="Kayla Freeman"
                                            src="/src/images/kaylacat.jpg"
                                            sx={{
                                                width: { xs: 100, sm: 120 },
                                                height: { xs: 100, sm: 120 },
                                                margin: '0 auto',
                                                transition: 'transform 0.3s',
                                                '&:hover': {
                                                    transform: 'scale(1.1)',
                                                },
                                            }}
                                        />
                                        <Typography variant="h6" component="h3" mt={2}>
                                            Kayla Freeman
                                        </Typography>
                                        <Typography variant="body2">
                                            Front-end Developer
                                        </Typography>
                                    </Box>
                                </Grid>
                                
                                <Grid item xs={12} sm={6} md={4}>
                                    <Box textAlign="center">
                                        <Avatar
                                            alt="Francisco Ortiz"
                                            src="/src/images/dogs.jpg"
                                            sx={{
                                                width: { xs: 100, sm: 120 },
                                                height: { xs: 100, sm: 120 },
                                                margin: '0 auto',
                                                transition: 'transform 0.3s',
                                                '&:hover': {
                                                    transform: 'scale(1.1)',
                                                },
                                            }}
                                        />
                                        <Typography variant="h6" component="h3" mt={2}>
                                            Francisco Ortiz
                                        </Typography>
                                        <Typography variant="body2">
                                            Designer & Developer
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box mb={4} id="achievements">
                            <Typography variant="h4" component="h2" gutterBottom>
                                Our Achievements
                            </Typography>
                            <Typography variant="body1">
                                We are proud to have helped thousands of individuals reach their fitness milestones and transform their lives through our innovative fitness programs and state-of-the-art technology.
                            </Typography>
                        </Box>
                        <Box mb={4} id="contact">
                            <Typography variant="h4" component="h2" gutterBottom>
                                Contact Us
                            </Typography>
                            <Typography variant="body1">
                                For inquiries, please email us at{' '}
                                <Link href="mailto:info@fitsyncpro.com" underline="hover">
                                    info@fitsyncpro.com
                                </Link>.
                            </Typography>
                        </Box>
                    </Box>
                    <Box component="footer" py={2}>
                        <Typography variant="body2" color="textSecondary">
                            &copy; 2024 Fitsync-PRO. All rights reserved.
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default AboutUs;
