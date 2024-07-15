import { Container, Box, Typography, Paper, Grid, Card, CardContent, LinearProgress, List, ListItem, ListItemText, Avatar, Divider, CardMedia } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const dailyRoutines = [
    { name: "", duration: '', icon: '' }, // Replace with actual image path
//     { name: 'Morning Run', duration: '30 mins', icon: '/src/images/run.png' }, // Replace with actual image path
//     { name: 'Strength Training', duration: '45 mins', icon: '/src/images/strength.png' }, // Replace with actual image path
//     { name: 'Yoga', duration: '20 mins', icon: '/src/images/yoga.png' }, // Replace with actual image path
// 
];

const progress = [
    { label: 'Workout Completion', value: 75 },
    { label: 'Calories Burned', value: 60 },
    { label: 'Steps Taken', value: 85 },
];

const exerciseProgress = [
    { name: 'Push Ups', target: 100, completed: 75 },
    { name: 'Squats', target: 200, completed: 150 },
    { name: 'Plank', target: 60, completed: 45 },
];

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const WorkoutComponent = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            sx={{
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
                            Workout Tracker
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Track your progress and daily routines
                        </Typography>

                        <Box mt={4} mb={2} width="100%">
                            <Typography variant="h5" gutterBottom>
                                Progress
                            </Typography>
                            {progress.map((item, index) => (
                                <Box key={index} mb={2}>
                                    <Typography variant="body1">{item.label}</Typography>
                                    <LinearProgress variant="determinate" value={item.value} sx={{ height: 10, borderRadius: 5 }} />
                                </Box>
                            ))}
                        </Box>

                        <Divider sx={{ width: '100%', my: 4 }} />

                        <Box mt={4} mb={2} width="100%">
                            <Typography variant="h5" gutterBottom>
                                Exercise Progress
                            </Typography>
                            {exerciseProgress.map((exercise, index) => (
                                <Box key={index} mb={2}>
                                    <Typography variant="body1">{exercise.name}</Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={(exercise.completed / exercise.target) * 100}
                                        sx={{ height: 10, borderRadius: 5 }}
                                    />
                                    <Typography variant="body2" color="textSecondary">
                                        {exercise.completed}/{exercise.target} completed
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        <Divider sx={{ width: '100%', my: 4 }} />

                        <Box mt={4} mb={2} width="100%">
                            <Typography variant="h5" gutterBottom>
                                Weekly Calendar
                            </Typography>
                            <Grid container spacing={2}>
                                {daysOfWeek.map((day, index) => (
                                    <Grid item xs key={index}>
                                        <Paper
                                            elevation={2}
                                            sx={{
                                                padding: { xs: 1, sm: 2 },
                                                backgroundColor: '#e0f7fa'
                                            }}
                                        >
                                            <Typography variant="h6">{day}</Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {dailyRoutines[index % dailyRoutines.length].name}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>

                        <Divider sx={{ width: '100%', my: 4 }} />

                        <Box mt={4} mb={2} width="100%">
                            <Typography variant="h5" gutterBottom>
                                Daily Routines
                            </Typography>
                            <Grid container spacing={4}>
                                {dailyRoutines.map((routine, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card>
                                            <CardContent>
                                                <Box display="flex" alignItems="center">
                                                    <Avatar src={routine.icon} sx={{ mr: 2 }} />
                                                    <Box>
                                                        <Typography variant="h6">{routine.name}</Typography>
                                                        <Typography variant="body2" color="textSecondary">{routine.duration}</Typography>
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>

                        <Divider sx={{ width: '100%', my: 4 }} />

                        <Box mt={4} mb={2} width="100%">
                            <Typography variant="h5" gutterBottom>
                                Professional Tracker
                            </Typography>
                            <List>
                                <ListItem>
                                    <CheckCircleIcon color="primary" sx={{ mr: 2 }} />
                                    <ListItemText primary="Workout Plan Updated" />
                                </ListItem>
                                <ListItem>
                                    <CheckCircleIcon color="primary" sx={{ mr: 2 }} />
                                    <ListItemText primary="New Exercises Added" />
                                </ListItem>
                                <ListItem>
                                    <CheckCircleIcon color="primary" sx={{ mr: 2 }} />
                                    <ListItemText primary="Meal Plan Customized" />
                                </ListItem>
                            </List>
                        </Box>

                        <Divider sx={{ width: '100%', my: 4 }} />

                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default WorkoutComponent;
