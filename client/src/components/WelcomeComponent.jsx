
import { Grid, Paper, Typography } from '@mui/material';

function ContentGrid() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper elevation={3}>
          <Typography variant="h6" component="h3" padding={2}>
            Welcome to FitSync Pro!
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={3}>
          <Typography variant="h6" component="image" padding={2}>
            Content 2
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={3}>
          <Typography variant="h6" component="image" padding={2}>
            Content 3
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={3}>
          <Typography variant="h6" component="h3" padding={2}>
            
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ContentGrid;