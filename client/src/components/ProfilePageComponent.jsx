import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  TextField,
  CircularProgress,
  Button,

} from "@mui/material";
import AuthService from "../utils/auth";
import { useState, useEffect, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import FullCalendar from "@fullcalendar/react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_WORKOUT } from "../utils/mutations";
import { GET_WORKOUTS_BY_USER } from "../utils/queries";

// chart js
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ProfilePageComponent() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  // Date states for calender
  const [newEventTitle, setNewEventTitle] = React.useState("");
  const [newEventDate, setNewEventDate] = React.useState("");
  const [events, setEvents] = React.useState("");
  const [eventsLoaded, setEventsLoaded] = useState(false);
  const [dateError, setDateError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [createWorkout] = useMutation(CREATE_WORKOUT);
  const { data } = useQuery(GET_WORKOUTS_BY_USER, { variables: { userId } });

  useEffect(() => {
    if (data && data.workouts) {
      const formattedEvents = data.workouts.map((workout) => ({
        title: workout.workoutTitle,
        date: workout.dateOfWorkout,
      }));
      setEvents(formattedEvents);
      setEventsLoaded(true);
    }
  }, [data]);

  const WorkoutGauge = ({ events }) => {
    console.log("events", events);
    if (!events || events.length === 0) {
      return null; // Return null or a loading indicator if events are not ready
    }

    const numWorkoutGoal = 10;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Filter events to include only those within the current month
    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      console.log(eventDate.getMonth())
      const eventMonth = event.date.split('-')[1]-1
      return (
        eventMonth === currentMonth &&
        eventDate.getFullYear() === currentYear
      );
    });

    const currentNumWorkouts = filteredEvents.length;
    const workoutProgress = (currentNumWorkouts / numWorkoutGoal) * 100;

    return (
      <Gauge
        width={200}
        height={100}
        value={workoutProgress}
        startAngle={-90}
        endAngle={90}
        sx={() => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 25,
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: "#52b202",
          },
        })}
      />
    );
  };

  // event handler that checks for date validation when adding a workout to the calender
  const handleAddEvent = async () => {
    let isValid = true;
  
    // Validate title
    if (!newEventTitle.trim()) {
      setTitleError("Workout title cannot be empty.");
      isValid = false;
    } else {
      setTitleError("");
    }
  
    // Validate date
    const selectedDate = new Date(newEventDate);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Remove time part
  
    if (!newEventDate) {
      setDateError("Workout date cannot be empty.");
      isValid = false;
    } else {
      setDateError("");
    }
  
    if (!isValid) return; // Stop if validation fails
  
    // Proceed with adding the event if validation passes
    try {
      const { data } = await createWorkout({
        variables: {
          input: {
            userId,
            workoutTitle: newEventTitle,
            dateOfWorkout: newEventDate,
          },
        },
      });
  
      setEvents([...events, { title: newEventTitle, date: newEventDate }]);
      setNewEventTitle("");
      setNewEventDate("");
    } catch (error) {
      console.error("Error creating workout:", error);
    }
  };
  

  // profile picture
  const fileInputRef = useRef(null); // file input
  const [avatarUrl, setAvatarUrl] = useState(""); // avatar urls
  const [isHovering, setIsHovering] = useState(false); // setting state for hovers for profile picture

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

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
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setAvatarUrl(data.data.profilePicture);
      })
      .catch((error) => console.error("Error fetching image:", error));
  }

  // function to upload user image
  const uploadImage = async (imageString) => {
    const hostUrl = import.meta.env.VITE_HOST_URL;
    fetch(`${hostUrl}/upload`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        avatarUrl: imageString,
        userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  };

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
      <Grid
        container
        spacing={2}
        padding={2}
        sx={{
          marginTop: "5rem",
          justifyContent: matches ? "center" : "flex-start",
        }}
      >
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 2, borderRadius: "5px" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept="image/*"
              />
              <Box
                sx={{
                  position: "relative",
                  width: 100,
                  height: 100,
                  "&:hover": {
                    "& .editIcon": {
                      display: "flex",
                    },
                    "&:hover": {
                      filter: "grayscale(30%) brightness(70%)",
                      svg: {
                        fill: "#696969",
                      },
                    },
                  },
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Avatar
                  alt="Profile Picture"
                  className="avatar"
                  sx={{
                    width: 100,
                    height: 100,
                    marginBottom: 2,
                    cursor: "pointer",
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
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 24,
                      height: 24,
                      color: "white",
                      zIndex: 2,
                      cursor: "pointer",
                    }}
                  />
                )}
              </Box>
            </Box>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", padding: "1rem", fontWeight: "bold" }}
            >
              {username}
            </Typography>
          </Paper>
          <Paper
            elevation={3}
            sx={{ padding: 2, borderRadius: "5px", marginTop: "20px" }}
          >
            {eventsLoaded ? (
              <WorkoutGauge events={events} /> // Render workoutGraph with events
            ) : (
              <CircularProgress /> // Show loading indicator while events are not loaded
            )}
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
              <Box
                component="form"
                onSubmit={(e) => e.preventDefault()}
                sx={{ marginTop: 2 }}
              >
                <TextField
                  error={!!titleError}
                  helperText={titleError}
                  label="Workout Title"
                  type="title"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  sx={{ margin: "1rem" }}
                />
                <TextField
                  error={!!dateError}
                  helperText={dateError}
                  label="Workout Date"
                  type="date"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ margin: "1rem", maxWidth: "17rem", width: "12rem" }}
                />
                <Button
                  onClick={handleAddEvent}
                  sx={{
                    margin: "1rem",
                    marginTop: "1.5rem",
                    backgroundColor: "#46563c",
                    "&:hover": {
                      backgroundColor: "#869f76",
                    },
                    color: "white",
                  }}
                >
                  {" "}
                  + Add Workout
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ProfilePageComponent;
