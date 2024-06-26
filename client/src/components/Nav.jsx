import { AppBar, Toolbar, Typography, Button, ThemeProvider, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: '#93a87e'
        }
    }
});

function Nav() {
    const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white', cursor: 'pointer' }} onClick={() => navigate('/')}>
          FitSync Pro
        </Typography>
        <Button color="inherit" sx={{color: 'white' }} onClick={() => navigate('/login')}>Login</Button>
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
}

export default Nav;