import React, { useState } from 'react';
import { Container, Box, Typography, Paper, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const exercises = [
    {
        name: 'Push Ups',
        description: 'Perform 3 sets of 15 reps.',
        image: '/src/images/Push-Ups.png', // Replace with actual image path
    },
    {
        name: 'Squats',
        description: 'Perform 3 sets of 20 reps.',
        image: '/src/images/Squats.png', // Replace with actual image path
    },
    {
        name: 'Plank',
        description: 'Hold for 60 seconds, 3 times.',
        image: '/src/images/Plank.png', // Replace with actual image path
    },
];

const WorkoutPage = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            sx={{
                background: '#f5f5f5', // Light background color
                minHeight: '100vh',
                p: 2,
                color: 'black',
                fontFamily: 'Roboto, sans-serif',
            }}
        >
            <Container maxWidth="lg">
                <Paper 
                    elevation={3} 
                    sx={{ 
                        padding: { xs: 2, sm: 4, md: 6 }, 
                        margin: '0 auto', 
                        backgroundColor: 'white',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h4" component="header" gutterBottom>
                            Workout Plan
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Your personalized workout plan for today
                        </Typography>

                        <Box mt={4} mb={2} width="100%">
                            <Grid container spacing={4}>
                                {exercises.map((exercise, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card
                                            sx={{
                                                position: 'relative',
                                                overflow: 'visible',
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={exercise.image}
                                                alt={exercise.name}
                                                sx={{
                                                    transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'scale(1.5)',
                                                        position: 'absolute',
                                                        zIndex: 1,
                                                        top: '-20%',
                                                        left: '-20%',
                                                        width: '120%',
                                                        height: 'auto',
                                                    },
                                                }}
                                            />
                                            <CardContent>
                                                <Typography variant="h6" component="div">
                                                    {exercise.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {exercise.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>

                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<FitnessCenterIcon />}
                            sx={{ mt: 4 }}
                        >
                            Start Workout
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default WorkoutPage;
