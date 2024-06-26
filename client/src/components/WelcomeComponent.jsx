
import { Grid, Paper, Typography } from '@mui/material';
import fitnessImage from '../images/fitness-img-1.jpg';

function WelcomeComponent() {
  return (
    <Grid container spacing={0} justifyContent="center" alignItems="stretch" sx={{ display: 'flex', flexWrap: 'wrap', padding: '3rem' }}>
      <Grid item xs={6} >
        <Paper elevation={0} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Typography variant="h6" component="h3" padding={2} textAlign="center">
            <strong>Welcome to FitSync Pro!</strong>
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={0}>
          <Typography variant="h6" component="image">
          <img src={fitnessImage} alt="Workout image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={0}>
          <Typography variant="h6" component="image">
          <img src={fitnessImage} alt="Workout image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={0} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Typography variant="h6" component="h3" padding={2}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum tenetur ea perferendis modi laboriosam earum eius.
          </Typography>
        </Paper>
      </Grid>
    </Grid>

  );
}

export default WelcomeComponent;