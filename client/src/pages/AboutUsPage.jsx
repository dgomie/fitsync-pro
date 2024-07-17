
import React from 'react';
import dan from '../images/danscat.jpg';
import kayla from '../images/kaylacat.jpg';
import francisco from '../images/dogs.jpg';
import { Container, Box, Typography, Grid, Link, Paper, Card, CardContent, CardMedia } from '@mui/material';
const AboutUs = () => {
    return (
        <div style={{ paddingTop: "100px", paddingBottom: "100px"}}>
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="105vh"
            textAlign="center"
        >
            <Container maxWidth="lg">
                <Paper elevation={3} sx={{ padding: { xs: 2, sm: 4, md: 6 }}}>
                    <Typography variant="h2" component="header" gutterBottom>
                        About Fitsync-Pro
                    </Typography>
                    <Box component="main">
                        <Box mb={4} id="company-history">
                            <Typography variant="h4" component="h2" gutterBottom>
                                Our History
                            </Typography>
                            <Typography variant="body1">
                                Fitsync-Pro started its journey in...
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
                                    <Card sx={{ maxWidth: 345, mx: 'auto' }}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={dan}
                                            alt="Daniel Gomez"
                                            sx={{
                                                transition: 'transform 0.3s',
                                                '&:hover': {
                                                    transform: 'scale(1.1)',
                                                },
                                            }}
                                        />
                                        <CardContent>
                                            <Typography variant="h6" component="h3">
                                                Daniel Gomez
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Back-end Developer
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card sx={{ maxWidth: 345, mx: 'auto' }}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={kayla}
                                            alt="Kayla Freeman"
                                            sx={{
                                                transition: 'transform 0.3s',
                                                '&:hover': {
                                                    transform: 'scale(1.1)',
                                                },
                                            }}
                                        />
                                        <CardContent>
                                            <Typography variant="h6" component="h3">
                                                Kayla Freeman
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Front-end Developer
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card sx={{ maxWidth: 345, mx: 'auto' }}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={francisco}
                                            alt="Francisco Ortiz"
                                            sx={{
                                                transition: 'transform 0.3s',
                                                '&:hover': {
                                                    transform: 'scale(1.1)',
                                                },
                                            }}
                                        />
                                        <CardContent>
                                            <Typography variant="h6" component="h3">
                                                Francisco Ortiz
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Designer & Developer
                                            </Typography>
                                        </CardContent>
                                    </Card>
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
                                <Link href="mailto:devs.fitsyncpro@gmail.com" underline="hover">
                                    devs.fitsyncpro@gmail.com
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
        </div>
    );
};
export default AboutUs;