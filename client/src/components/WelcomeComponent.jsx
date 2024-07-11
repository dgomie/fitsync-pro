
import { Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import fitnessImage from '../images/fitness-img-1.jpg';

function WelcomeComponent() {
  const matches = useMediaQuery('(max-width:600px)');
  return (
    <Grid container spacing={0} justifyContent="center" alignItems="stretch" sx={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      padding: '3rem',
      paddingTop: matches ? '10rem' : '3rem',
       }}>
      <Grid item xs={12} sm={6} >
        <Paper elevation={0} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Typography variant={matches ? "subtitle1" : "h6"} component="h3" padding={2} textAlign="center">
            <strong>Welcome to FitSync Pro!</strong>
          </Typography>
        </Paper>
      </Grid>
      {!matches && (
        <Grid item xs={12} sm={6}>
          <Paper elevation={0}>
            <Typography variant="h6" component="image">
              <img src={fitnessImage} alt="Workout image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Typography>
          </Paper>
        </Grid>
      )}
      <Grid item xs={12} sm={6}>
        <Paper elevation={0}>
          <Typography variant="h6" component="image">
          <img src={fitnessImage} alt="Workout image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper elevation={0} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Typography variant="h6" component="h3" padding={2}>
Transform your fitness journey with fitsync Pro. Whether you're aiming for strength, flexibility, or just a healthier lifestyle, we provide tailored workouts, progress tracking, and meal tracking. Join our community and start achieving your goals today!
          </Typography>
        </Paper>
      </Grid>
    </Grid>

  );
}

export default WelcomeComponent;