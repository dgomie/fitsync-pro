import { useState } from 'react';

import { TextField, Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';


function LoginComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
      event.preventDefault(); 
    //   add code to navigate to homepage if login info is correct
    };
  
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
              backgroundColor: '#b4c4ab',
              padding: '5rem',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TextField
              label="Username"
              variant="outlined"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              InputProps={{
                style: { backgroundColor: 'white' },
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                style: { backgroundColor: 'white' },
              }}
            />
            <Button type="submit" variant="contained" sx={{ mt: 1, backgroundColor: '#46563c', '&:hover': {
                backgroundColor: '#869f76'
            } }}>
              Login
            </Button>
            <Typography padding={1}>Not Yet A User?
            </Typography>
            <Button type="submit" variant="contained" sx={{ mt: 1, backgroundColor: '#46563c', '&:hover': {
                backgroundColor: '#869f76'
            } }} onClick={() => navigate('Signup')}>
              Register
            </Button>
          </Box>
        </div>
      );
  }
  
  export default LoginComponent;