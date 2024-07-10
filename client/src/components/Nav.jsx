import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, ThemeProvider, createTheme, useMediaQuery, IconButton, Menu, MenuItem, useScrollTrigger } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import Auth from '../utils/auth';

const theme = createTheme({
    palette: {
        primary: {
            main: '#93a87e'
        }
    }
});

const BlurOnScroll = ({ children }) => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {
        sx: {
            background: trigger ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
            backdropFilter: trigger ? 'blur(10px)' : 'none',
            transition: 'background 0.3s, backdrop-filter 0.3s',
        },
    });
};

function Nav() {
    const navigate = useNavigate(); // navigates pages
    const location = useLocation();
    const isLoggedIn = Auth.loggedIn(); // checks if user is logged in
    const matches = useMediaQuery(theme.breakpoints.down('sm')); // checks for screen size
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }; // hamburger menu handler

    const handleClose = () => {
        setAnchorEl(null);
    }; // closing hamburger menu handler

    return (
        <ThemeProvider theme={theme}>
            <BlurOnScroll>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white', cursor: 'pointer', marginX: { sm: '0', md: '4rem' } }} onClick={() => navigate('/')}>
                            FitSync Pro
                        </Typography>
                        {matches ? (
                            <>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="end"
                                    onClick={handleMenu}
                                    sx={{ color: 'white' }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    {!isLoggedIn && location.pathname !== '/login' && (
                                        <MenuItem onClick={() => { handleClose(); navigate('/login'); }}>Login</MenuItem>
                                    )}
                                    {isLoggedIn && (
                                        <>
                                            <MenuItem onClick={() => { handleClose(); navigate('/about-us'); }}>About Us</MenuItem>
                                            <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>Profile</MenuItem>
                                            <MenuItem onClick={() => { Auth.logout(); handleClose(); navigate('/'); }}>Logout</MenuItem>
                                            <MenuItem onClick={() => { handleClose(); navigate('/settings'); }}>Settings</MenuItem>
                                        </>
                                    )}
                                </Menu>
                            </>
                        ) : (
                            <>
                                {!isLoggedIn && location.pathname !== '/login' && (
                                    <Button sx={{ color: 'white', marginX: '2rem' }} onClick={() => navigate('/login')}>Login</Button>
                                )}
                                {isLoggedIn && (
                                    <>
                                        <Button sx={{ color: 'white', marginX: '2rem' }} onClick={() => navigate('/about-us')}>About Us</Button>
                                        <Button sx={{ color: 'white', marginX: '2rem' }} onClick={() => navigate('/profile')}>Profile</Button>
                                        <Button sx={{ color: 'white', marginX: '2rem' }} onClick={() => { Auth.logout(); navigate('/'); }}>Logout</Button>
                                        <Button sx={{ color: 'white', marginX: '2rem' }} onClick={() => navigate('/settings')}>Settings</Button>
                                    </>
                                )}
                            </>
                        )}
                    </Toolbar>
                </AppBar>
            </BlurOnScroll>
        </ThemeProvider>
    );
}

export default Nav;
