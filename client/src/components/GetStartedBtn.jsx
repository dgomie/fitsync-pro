import { Button, Box, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function GetStartedBtn() {
    const navigate = useNavigate(); // Step 2

    const handleClick = () => {
      navigate('/get-started'); // Adjust the path as needed
    };
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Stack spacing={2} sx={{ alignItems:"center" }}>
        <Typography variant="h5" component="h2" gutterBottom>Get started today!</Typography>
      <Button variant="contained" color="primary" size="large" sx={{ mt: 1, backgroundColor: '#46563c', '&:hover': {
        backgroundColor: '#869f76'
      }, fontSize: 'large', padding: '10px 60px' }} onClick={handleClick}>
        Get Started
      </Button>
      </Stack>
    </Box>
  );
}

export default GetStartedBtn;