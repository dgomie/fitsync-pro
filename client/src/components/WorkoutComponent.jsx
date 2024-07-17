import { useState, useEffect } from "react";
import {
  Snackbar,
  Alert,
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Divider,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import AuthService from "../utils/auth";
import { CREATE_WORKOUT } from "../utils/mutations";
import { GET_WORKOUTS_BY_USER } from "../utils/queries";

const dailyRoutines = [
  { name: "", duration: "", icon: "" }, // Replace with actual image path
];

const progress = [
  { label: "Workout Completion", value: 75 },
  { label: "Calories Burned", value: 60 },
  { label: "Steps Taken", value: 85 },
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const WorkoutComponent = () => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [createWorkout] = useMutation(CREATE_WORKOUT);
  const { data } = useQuery(GET_WORKOUTS_BY_USER, { variables: { userId } });
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    workoutTitle: "",
    dateOfWorkout: "",
    duration: "",
    calories: "",
  });
  const [errors, setErrors] = useState({ workoutTitle: "", dateOfWorkout: "" });

  useEffect(() => {
    const profile = AuthService.getProfile();
    setUsername(profile.data.username);
    setUserId(profile.data._id);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCloseSnackbar = () => {
    setErrorMessage("");
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    // Allow empty values and validate only if values are provided
    let error = '';
    if ((name === 'calories' || name === 'duration') && value !== '' && !/^\d+$/.test(value)) {
        error = `${name === 'calories' ? 'Calories' : 'Duration'} must be an integer`;
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
};

  const validateForm = () => {
    let valid = true;
    const newErrors = { workoutTitle: "", dateOfWorkout: "" };

    if (!formData.workoutTitle) {
      newErrors.workoutTitle = "Workout title is required";
      valid = false;
    }

    if (!formData.dateOfWorkout) {
      newErrors.dateOfWorkout = "Date of workout is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
        return;
    }

    // Check if the parsed values are valid integers or empty
    const parsedCalories = formData.calories === '' ? null : parseInt(formData.calories, 10);
    const parsedDuration = formData.duration === '' ? null : parseInt(formData.duration, 10);

    if ((formData.calories !== null && isNaN(parsedCalories)) || (formData.duration !== null && isNaN(parsedDuration))) {
        setErrors({
            ...errors,
            calories: isNaN(parsedCalories) ? 'Calories must be an integer' : '',
            duration: isNaN(parsedDuration) ? 'Duration must be an integer' : ''
        });
        setErrorMessage('Please ensure all fields are correctly filled out.');
        return;
    }

    try {
        await createWorkout({
            variables: { 
                workoutTitle: formData.workoutTitle,
                dateOfWorkout: formData.dateOfWorkout,
                duration: parsedDuration,
                calories: parsedCalories,
                userId: userId
            }
        });
        setOpen(false);
    } catch (error) {
        console.error("Error creating workout:", error);
        setErrorMessage('Error creating workout. Please try again.');
    }
};

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      sx={{
        minHeight: "100vh",
        p: 2,
        color: "black",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            padding: { xs: 2, sm: 4, md: 6 },
            margin: "0 auto",
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" component="header" gutterBottom>
              Workout Tracker
            </Typography>
            <Typography variant="h6" gutterBottom>
              Track your progress and daily routines
            </Typography>

            <Box mt={4} mb={2} width="100%">
              <Typography variant="h5" gutterBottom>
                Exercise Progress
              </Typography>
              {progress.map((item, index) => (
                <Box key={index} mb={2}>
                  <Typography variant="body1">{item.label}</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={item.value}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </Box>
              ))}
            </Box>

            <Divider sx={{ width: "100%", my: 4 }} />

            <Box mt={4} mb={2} width="100%">
              <Typography variant="h5" gutterBottom>
                Weekly Calendar
              </Typography>
              <Grid container spacing={2}>
                {daysOfWeek.map((day, index) => (
                  <Grid item xs key={index}>
                    <Paper
                      elevation={2}
                      sx={{
                        padding: { xs: 1, sm: 2 },
                        backgroundColor: "#e0f7fa",
                      }}
                    >
                      <Typography variant="h6">{day}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dailyRoutines[index % dailyRoutines.length].name}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Divider sx={{ width: "100%", my: 4 }} />

            <Box mt={4} mb={2} width="100%">
              <Typography variant="h5" gutterBottom>
                Past Workouts
              </Typography>
              <Grid container spacing={4}>
                {dailyRoutines.map((routine, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <CardContent>
                        <Box display="flex" alignItems="center">
                          <Avatar src={routine.icon} sx={{ mr: 2 }} />
                          <Box>
                            <Typography variant="h6">{routine.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              {routine.duration}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Button
              variant="contained"
              color="success"
              onClick={handleClickOpen}
            >
              Add Workout
            </Button>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add New Workout</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  name="workoutTitle"
                  label="Workout Title"
                  type="text"
                  fullWidth
                  value={formData.workoutTitle}
                  onChange={handleChange}
                  error={!!errors.workoutTitle}
                  helperText={errors.workoutTitle}
                />
                <TextField
                  margin="dense"
                  name="dateOfWorkout"
                  label="Date of Workout"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={formData.dateOfWorkout}
                  onChange={handleChange}
                  error={!!errors.dateOfWorkout}
                  helperText={errors.dateOfWorkout}
                />
                <TextField
                  margin="dense"
                  name="duration"
                  label="Duration (mins)"
                  type="text"
                  fullWidth
                  value={formData.duration}
                  onChange={handleChange}
                  error={!!errors.duration}
                  helperText={errors.duration}
                />
                <TextField
                  margin="dense"
                  name="calories"
                  label="Calories"
                  type="text"
                  fullWidth
                  value={formData.calories}
                  onChange={handleChange}
                  error={!!errors.calories}
                  helperText={errors.calories}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  Submit
                </Button>
              </DialogActions>
              <Snackbar
                open={!!errorMessage}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
              >
                <Alert onClose={handleCloseSnackbar} severity="error">
                  {errorMessage}
                </Alert>
              </Snackbar>
            </Dialog>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default WorkoutComponent;
