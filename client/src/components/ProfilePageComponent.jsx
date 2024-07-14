
import { Grid, Paper, Avatar, Typography, Button, Box, useMediaQuery, useTheme } from '@mui/material';
import AuthService from '../utils/auth';
import { useState, useEffect, useRef } from 'react';
import EditIcon from '@mui/icons-material/Edit';


function ProfilePageComponent() {
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');

    // profile picture
    const fileInputRef = useRef(null); // file input
    const [avatarUrl, setAvatarUrl] = useState(''); // avatar urls
    const [isHovering, setIsHovering] = useState(false); // setting state for hovers for profile picture

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    
 
    useEffect(() => {
            const profile = AuthService.getProfile();
            setUsername(profile.data.username);
            setUserId(profile.data._id);
            getImage(profile.data._id);
      }, []);


    // profile picture handlers
    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    // Function to fetch user image
    function getImage(userId) {
        if (!userId) return;
        const hostUrl = import.meta.env.VITE_HOST_URL;
        fetch(`${hostUrl}/profileImage/${userId}`, {
            method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => {
            setAvatarUrl(data.data.profilePicture);
        })
        .catch((error) => console.error('Error fetching image:', error));
    }

    const uploadImage = async (imageString) => {
        const hostUrl = import.meta.env.VITE_HOST_URL;
        fetch(`${hostUrl}/upload`, {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                avatarUrl: imageString,
                userId
            })
        }).then((res) => res.json())
            .then((data) => console.log(data))
            .catch(err => {
                console.log(err)
            });
    }

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageString = reader.result;
                setAvatarUrl(imageString);
                uploadImage(imageString);
            };
           reader.readAsDataURL(file);
        }
    };


    return (
        <Grid container spacing={2} padding={2} sx={{ marginTop: '5rem', justifyContent: matches ? 'center' : 'flex-start' }}>
            <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ padding: 2, borderRadius: '5%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                        <Box
                            sx={{
                                position: 'relative', width: 100, height: 100,
                                '&:hover': {
                                    '& .editIcon': {
                                        display: 'flex',
                                    },
                                    '&:hover': {
                                        filter: 'grayscale(30%) brightness(70%)',
                                        'svg': {
                                            fill: '#696969'
                                        }
                                    }
                                },
                            }}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            <Avatar
                                alt="Profile Picture"
                                className="avatar"
                                sx={{
                                    width: 100, height: 100, marginBottom: 2, cursor: 'pointer',
                                }}
                                onClick={handleAvatarClick}
                                src={avatarUrl}
                            >
                                {!avatarUrl && <EditIcon />}
                            </Avatar>
                            {avatarUrl && isHovering && (
                                <EditIcon
                                    className="editIcon"
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: 24,
                                        height: 24,
                                        color: 'white',
                                        zIndex: 2,
                                        cursor: 'pointer'
                                    }}
                                    onClick={handleAvatarClick}
                                />
                            )}
                        </Box>
                    </Box>
                    <Typography variant="h6" sx={{ textAlign: 'center', padding: '1rem', fontWeight: 'bold' }}>{username}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={8} container spacing={2}>
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Box sx={{ textAlign: 'center', height: '300px' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>My Workouts</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <Typography sx={{ color: 'grey', opacity: 0.5 }}>No current workouts...</Typography>
                                <Button variant="contained" sx={{
                                    mt: 1, backgroundColor: '#46563c', '&:hover': {
                                        backgroundColor: '#869f76',
                                    }
                                }}>+ add workouts</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Box sx={{ textAlign: 'center', height: '300px', }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>My Meals</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <Typography sx={{ color: 'grey', opacity: 0.5 }}>No current meals...</Typography>
                                <Button variant="contained" sx={{
                                    mt: 1, backgroundColor: '#46563c', '&:hover': {
                                        backgroundColor: '#869f76'
                                    }
                                }}>+ add meals</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ProfilePageComponent;