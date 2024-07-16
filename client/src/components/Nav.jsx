import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, ThemeProvider, createTheme, useMediaQuery, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import Auth from '../utils/auth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import logo from '../images/fitsync-pro-transparent.png'

const theme = createTheme({
    palette: {
        primary: {
            main: '#93A87E'
        }
    }
});

function Nav() {
    const navigate = useNavigate(); // navigates pages
    const location = useLocation();
    const isLoggedIn = Auth.loggedIn(); // checks if user is logged in
    const matches = useMediaQuery(theme.breakpoints.down('md')); // checks for screen size
    const [anchorEl, setAnchorEl] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }; // hamburger menu handler

    const handleClose = () => {
        setAnchorEl(null);
    }; // closing hamburger menu handler

    useEffect(() => {
        const handleScroll = () => {
            const position = window.pageYOffset;
            setIsScrolled(position > 0);
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" sx={{
                backgroundColor: isScrolled ? 'rgba(147, 168, 126, 0.5)' : 'rgba(147, 168, 126, 0.5)',
                backdropFilter: isScrolled ? 'blur(10px)' : 'none',
                transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
                borderRadius: '30px',
                marginTop: '1rem',
                marginX: 'auto'
            }}>
                <Toolbar>
                    {!matches && (
                        <Box sx={{ color: 'white', cursor: 'pointer', marginX: { sm: '0', md: '4rem' } }} onClick={() => navigate('/')}>
                            <img src={logo} alt="Logo" style={{ height: '50px', backgroundColor: 'white', borderRadius: '50%', padding: '10px' }} />
                        </Box>
                    )}
                    {matches ? (
                        <>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleMenu}
                                sx={{
                                    color: 'white',
                                    marginLeft: 'auto'
                                }}
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
                                        <MenuItem onClick={() => { handleClose(); navigate('/workout'); }}>Workout</MenuItem>
                                        <MenuItem onClick={() => { handleClose(); navigate('/fit-ai'); }}>Fit-AI</MenuItem>
                                        <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>Profile</MenuItem>
                                        <MenuItem onClick={() => { handleClose(); navigate('/settings'); }}>Settings</MenuItem>
                                        <MenuItem onClick={() => { Auth.logout(); handleClose(); navigate('/'); }}>Logout</MenuItem>

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
                                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10rem' }}>
                                        <Button sx={{ color: 'white', mx: '1rem' }} onClick={() => navigate('/about-us')}>About Us</Button>
                                        <Button sx={{ color: 'white', mx: '1rem' }} onClick={() => navigate('/workout')}>Workout</Button>
                                        <Button sx={{ color: 'white', mx: '1rem' }} onClick={() => navigate('/fit-ai')}>Fit-AI</Button>
                                    </Box>
                                    <IconButton sx={{ color: 'white', marginX: '2rem' }} onClick={() => navigate('/profile')}>
                                        <AccountCircleIcon />
                                    </IconButton>
                                    <IconButton sx={{ color: 'white', marginX: '2rem' }} onClick={() => navigate('/settings')}>
                                        <SettingsIcon />
                                    </IconButton>
                                    <Button sx={{ color: 'white', marginX: '2rem' }} onClick={() => { Auth.logout(); navigate('/'); }}>Logout</Button>

                                </>
                            )}
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}
export default Nav;