import { Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import image from '../images/homepage-image.jpg';
import image2 from '../images/home-image2.jpg';

function WelcomeComponent() {
  const matches = useMediaQuery('(max-width:600px)');
  return (
    <Grid container spacing={2} 
    justifyContent="center"
    alignItems="stretch"
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      maxWidth: '1000px',
      margin: 'auto', 
      padding: '0 1rem',
       }}>
      <Grid item xs={12} sm={6}>
        <Paper elevation={0} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: 'rgb(246, 246, 241)' }}>
          <Typography variant={matches ? "subtitle1" : "h6"} component="h3" padding={2} textAlign="center">
            <strong>Welcome to FitSync Pro!</strong>
          </Typography>
        </Paper>
      </Grid>
      {!matches && (
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} sx={{ backgroundColor: 'rgb(246, 246, 241)'}}>
            <Typography variant="h6" component="image">
              <img src={image} alt="Workout image" style={{ width: '100%', height: '100%', objectFit: 'cover', padding: '1rem', backgroundColor: 'rgb(246, 246, 241)' }} />
            </Typography>
          </Paper>
        </Grid>
      )}
      {!matches && (
      <Grid item xs={12} sm={6}>
        <Paper elevation={0} sx={{ backgroundColor: 'rgb(246, 246, 241)' }}>
          <Typography variant="h6" component="image">
          <img src={image2} alt="Workout image" style={{ width: '100%', height: '100%', objectFit: 'cover', padding: '1rem', backgroundColor: 'rgb(246, 246, 241)'}} />
          </Typography>
        </Paper>
      </Grid>
      )}
      <Grid item xs={12} sm={6}>
        <Paper elevation={0} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: 'rgb(246, 246, 241)' }}>
          <Typography variant="h6" component="h3" padding={2}>
Transform your fitness journey with FitSync Pro. Whether you're aiming for strength, flexibility, or just a healthier lifestyle, we provide tailored workouts and progress tracking. Join our community and start achieving your goals today!
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default WelcomeComponent;