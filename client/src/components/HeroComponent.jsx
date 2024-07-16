import heroImage from '../images/hero-image.jpg';
import { Box, Paper, Button, Grid } from '@mui/material'

function Hero({ scrollToGetStarted }) {
    return (
        <Grid container spacing={1} justifyContent="center" alignItems="stretch" sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
             }}>
    <Box sx={{ width: '100vw', padding: 0, margin: 0, height: '50vh' }}>
    <Paper 
      sx={{ 
        position: 'relative', 
        height: 600, 
        backgroundImage: `url(${heroImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'stretch',
        width: '100vw',
        
      }}
    >
      <Button variant="contained" color="primary" sx={{ 
        position: 'absolute', 
        bottom: 20, 
        backgroundColor: '#46563c', 
        '&:hover': {
            backgroundColor: '#869f76' }, 
            borderRadius: '30px' }}
            onClick={scrollToGetStarted}>
        Get Started
      </Button>
    </Paper>
  </Box>
  </Grid>
  );
}

export default Hero;