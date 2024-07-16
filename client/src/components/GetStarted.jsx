
import { Container, Box, Typography, Button, Paper, Card, CardMedia, CardContent } from '@mui/material';

const GetStartedPage = () => {
    return (
        <>

        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            textAlign="center"
            // bgcolor="#f0f4f8"
            p={2}
            position="relative"
            // sx={{ marginTop: '25rem'}}
        >
                    <Box sx={{ width: '100%', height: '2rem', backgroundColor: 'rgb(246, 246, 241)', marginBottom: '2rem', marginTop: '2rem'}}
        
        
    />
            <Container maxWidth="md">
                <Paper elevation={3} style={{ padding: '2rem', margin: '0 auto', position: 'relative' }}>

                    <Typography variant="h2" component="header" gutterBottom>
                        Get Started with Fitsync-PRO
                    </Typography>
                    <Box mb={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                lenght="300"
                                image="../src/images/fitsync-pro1.png"
                                alt="Fitsync-Pro"
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary">
                                    Achieve your fitness goals with Fitsync-PRO
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box mb={4}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Your Fitness Journey Begins Here
                        </Typography>
                        <Typography variant="body1">
                            Fitsync-PRO is your ultimate fitness companion. Whether you are a beginner or a seasoned athlete,
                            we have the tools and programs to help you reach your fitness goals.
                        </Typography>
                    </Box>
                    <Box mb={4}>
                        <Typography variant="h6" component="h3" gutterBottom>
                            Why Choose Fitsync-PRO?
                        </Typography>
                        <Typography variant="body1">
                            - Personalized fitness plans<br />
                            - Progress tracking<br />
                            - Expert advice and support<br />
                            - Community of like-minded individuals<br />
                            - And much more!
                        </Typography>
                    </Box>
                    <Box mb={4}>
                        <Typography variant="h6" component="h3" gutterBottom>
                            Get Started in 3 Easy Steps
                        </Typography>
                        <Typography variant="body1">
                            1. Sign Up<br />
                            2. Set Your Goals<br />
                            3. Start Your Fitness Journey
                        </Typography>
                    </Box>
                    <Button variant="contained" color="primary" size="large" href="/signUp">
                        Get Started Now
                    </Button>
                </Paper>
            </Container>
        </Box>
        </>
    );
};

export default GetStartedPage;