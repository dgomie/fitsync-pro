// on reload we need the workouts to stay and save with user
import React from 'react';
import { Grid, Paper, Avatar, Typography, Box, useMediaQuery, useTheme, TextField, Button } from '@mui/material';
import AuthService from '../utils/auth';
import { useState, useEffect, useRef } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

// chart js
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function WorkoutGraph({ workouts }) {
    const [chartData, setChartData] = useState({
      labels: [],
      datasets: [
        {
          label: 'Number of Workouts',
          data: [],
          borderColor: 'rgb(70, 86, 60)',
          backgroundColor: 'rgba(134, 159, 118, 0.5)',
        },
      ],
    });

    const options = {
      scales: {
        x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Workouts'
            }
          },
        y:
        {
            type: 'linear', 
            ticks: {
              stepSize: 1,
              min: 1, 
              max: 30, 
              callback: function(value) {
                if (value % 1 === 0) { 
                  return value;
                }
              }
            },
          title: {
            display: true,
            text: 'Date'
          }
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        title: {
          display: true,
          text: 'Last 30 Days'
        }
      }
    };
  
    return <Line data={chartData} options={options} />;
}

function ProfilePageComponent() {
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    
    // Date states for calender
    const [newEventTitle, setNewEventTitle] = React.useState('');
    const [newEventDate, setNewEventDate] = React.useState('');
    const [events, setEvents] = React.useState('');
    const [dateError, setDateError] = useState('');

    const [workouts, setWorkouts] = useState([]);

    // event handler that checks for date validation when adding a workout to the calender
    const handleAddEvent = () => {
        const currentDate = new Date();
        const currentYear = new Date().getFullYear();
        const eventYear = newEventDate.split('-')[0];
        const newEvent = { title: newEventTitle, date: newEventDate };
        const eventDate = new Date(newEventDate);

        if (eventDate < currentDate) {
            setDateError('Invalid date');
            return; 
        }

        setEvents([...events, newEvent]);
        // Reset form
        if (parseInt(eventYear, 10) !== currentYear) {
            setDateError('You can only add workouts for the current year.');
            return;
        }
        setDateError('');
        setNewEventTitle('');
        setNewEventDate('');
    };

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

    // function to upload user image
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

    // handler for file changes
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
        <>
        {/* FullCalendar styling (does not use material ui) */}
        <style>
        {`
        .fc .fc-button-primary {
            background-color: #46563c; /* New primary button color */
            border-color: #46563c; /* New primary button border color */
            color: white; /* Text color */
        }
        .fc .fc-button-primary:hover {
            background-color: #869f76; /* New hover state color */
            border-color: #869f76; /* New hover state border color */
        }
        .fc-daygrid-day-number {
            color: #46563c !important;
        }
        .fc .fc-col-header-cell-cushion {
            color: #46563c;
        }
        .fc .fc-day-today {
            background-color: #ddf2d1 !important;
        }
        `}
    </style> 
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

                                />
                            )}
                        </Box>
                    </Box>
                    <Typography variant="h6" sx={{ textAlign: 'center', padding: '1rem', fontWeight: 'bold' }}>{username}</Typography>
                    <WorkoutGraph workouts={workouts} /> 
                </Paper>
            </Grid>
            <Grid item xs={12} md={8} container spacing={2}>
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <FullCalendar
                            key={events.length}
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            weekends={true}
                            events={events}
                        />
                        <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ marginTop: 2 }}>
                            <TextField
                                label="Workout Title"
                                type="title"
                                value={newEventTitle}
                                onChange={(e) => setNewEventTitle(e.target.value)}
                                sx={{ margin: '1rem' }}
                            />
                            <TextField
                                label="Workout Date"
                                type="date"
                                value={newEventDate}
                                onChange={(e) => setNewEventDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{ margin: '1rem', maxWidth: '17rem', width: '12rem' }}
                                helperText={dateError}
                            />
                            <Button onClick={handleAddEvent} sx={{ 
                                margin: '1rem', 
                                marginTop: '1.5rem', 
                                backgroundColor: '#46563c', 
                                '&:hover': {
                                backgroundColor: '#869f76'
                                }, 
                                color: 'white' }}> + Add Workout</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
        </>
    );
}

export default ProfilePageComponent;