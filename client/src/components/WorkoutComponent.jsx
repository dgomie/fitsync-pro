import { useState, useEffect, refetch } from "react";
import {
  Snackbar,
  Alert,
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardActions,
  CardContent,
  LinearProgress,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import { Edit, Delete, Whatshot, Timer } from "@mui/icons-material";
import CaloriesBurnedIcon from "../images/fire.svg";
import ActiveMinutesIcon from "../images/stopwatch.svg";
import { useMutation, useQuery } from "@apollo/client";
import AuthService from "../utils/auth";
import {
  CREATE_WORKOUT,
  DELETE_WORKOUT,
  UPDATE_WORKOUT,
} from "../utils/mutations";
import { GET_WORKOUTS_BY_USER, GET_USER } from "../utils/queries";

const WorkoutComponent = () => {
  const [userId, setUserId] = useState("");
  const [durationGoal, setDurationGoal] = useState("");
  const [workoutGoal, setWorkoutGoal] = useState("");
  const [createWorkout] = useMutation(CREATE_WORKOUT);
  const [deleteWorkout] = useMutation(DELETE_WORKOUT, {
    onCompleted: () => refetch(),
  });
  const [updateWorkout] = useMutation(UPDATE_WORKOUT, {});

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    workoutTitle: "",
    dateOfWorkout: "",
    duration: "",
    calories: "",
  });
  const [errors, setErrors] = useState({ workoutTitle: "", dateOfWorkout: "" });
  const [workoutToEdit, setWorkoutToEdit] = useState(null);

  useEffect(() => {
    const profile = AuthService.getProfile();
    setUserId(profile.data._id);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setEditMode(false);
    setFormData({
      workoutTitle: "",
      dateOfWorkout: "",
      duration: "",
      calories: "",
    });
  };

  const handleEditOpen = (workout) => {
    setOpen(true);
    setEditMode(true);
    setWorkoutToEdit(workout);
    setFormData({
      workoutTitle: workout.workoutTitle,
      dateOfWorkout: workout.dateOfWorkout,
      duration: workout.duration,
      calories: workout.caloriesBurned,
    });
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

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await deleteWorkout({ variables: { id } });
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const parsedCalories =
      formData.calories === "" ? null : parseInt(formData.calories, 10);
    const parsedDuration =
      formData.duration === "" ? null : parseInt(formData.duration, 10);

    if (
      (formData.calories !== null && isNaN(parsedCalories)) ||
      (formData.duration !== null && isNaN(parsedDuration))
    ) {
      setErrors({
        ...errors,
        calories: isNaN(parsedCalories)
          ? "Calories must be a number greater than 0"
          : "",
        duration: isNaN(parsedDuration)
          ? "Duration must be a number greater than 0"
          : "",
      });
      setErrorMessage("Please ensure all fields are correctly filled out.");
      return;
    }

    try {
      const input = {
        userId,
        workoutTitle: formData.workoutTitle,
        dateOfWorkout: formData.dateOfWorkout,
        duration: parsedDuration,
        caloriesBurned: parsedCalories,
      };

      if (editMode) {
        console.log("input", input);
        await updateWorkout({
          variables: {
            id: workoutToEdit._id,
            input,
          },
        });
      } else {
        await createWorkout({
          variables: {
            input,
          },
        });
      }

      setOpen(false);
      setFormData({
        workoutTitle: "",
        dateOfWorkout: "",
        duration: "",
        calories: "",
      });
    } catch (error) {
      console.error("Error creating/updating workout:", error);
      setErrorMessage("Error creating/updating workout. Please try again.");
    }
  };

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { userId },
    skip: !userId,
  });

  useEffect(() => {
    if (data && data.user) {
      setDurationGoal(data.user.durationGoal);
      setWorkoutGoal(data.user.workoutGoal);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const WorkoutProgress = ({ workoutSaved }) => {
    const { data, loading, error, refetch } = useQuery(GET_WORKOUTS_BY_USER, {
      variables: { userId },
    });

    const [totalDuration, setTotalDuration] = useState(0);
    const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);
    const [totalWorkouts, setTotalWorkouts] = useState(0);

    useEffect(() => {
      if (data && data.workouts) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // 0-11
        const currentYear = currentDate.getFullYear();

        const filteredWorkouts = data.workouts.filter((workout) => {
          const workoutDate = new Date(workout.dateOfWorkout);
          const workoutMonth = workout.dateOfWorkout.split("-")[1] - 1;
          return (
            workoutMonth === currentMonth &&
            workoutDate.getFullYear() === currentYear
          );
        });
        const totalWorkouts = filteredWorkouts.length;

        const totalDuration = filteredWorkouts.reduce(
          (acc, curr) => acc + curr.duration,
          0
        );
        const totalCaloriesBurned = filteredWorkouts.reduce(
          (acc, curr) => acc + curr.caloriesBurned,
          0
        );
        setTotalWorkouts(totalWorkouts);
        setTotalDuration(totalDuration);
        setTotalCaloriesBurned(totalCaloriesBurned);
      }
    }, [data]);

    // Refetch workouts when a new workout is saved
    useEffect(() => {
      refetch();
    }, [workoutSaved, refetch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
      <div>
        <Typography
          paddingBottom="25px"
          color="text.secondary"
          variant="h4"
          gutterBottom
        >
          Your Monthly Exercise Progress
        </Typography>
        <Grid container spacing={3} sx={{ width: "100%" }}>
          <Grid item xs={12} md={6}>
            <Box mt={4} mb={2}>
              <Typography variant="body1">Workouts Completed</Typography>
              <LinearProgress
                variant="determinate"
                value={Math.min((totalWorkouts / workoutGoal) * 100, 100)}
                sx={{
                  height: 20,
                  borderRadius: 5,
                  width: "100%",
                  "& .MuiLinearProgress-barColorPrimary": {
                    backgroundColor: "#52b202",
                  },
                }}
              />
              <Typography variant="body2" color="textSecondary">
                {totalWorkouts}/{workoutGoal} completed
              </Typography>
              <Box mt={4} mb={2}>
                <Typography variant="body1">Monthly Active Minutes</Typography>
                <LinearProgress
                  variant="determinate"
                  value={Math.min((totalDuration / durationGoal) * 100, 100)}
                  sx={{
                    height: 20,
                    borderRadius: 5,
                    width: "100%",
                    "& .MuiLinearProgress-barColorPrimary": {
                      backgroundColor: "#52b202",
                    },
                  }}
                />
                <Typography variant="body2" color="textSecondary">
                  {totalDuration}/{durationGoal} completed
                </Typography>
              </Box>
              <Box mt={4} mb={2}>
                <Typography variant="body1">Calories Burned</Typography>
                <LinearProgress
                  variant="determinate"
                  value={Math.min((totalCaloriesBurned / 3000) * 100, 100)}
                  sx={{
                    height: 20,
                    borderRadius: 5,
                    width: "100%",
                    "& .MuiLinearProgress-barColorPrimary": {
                      backgroundColor: "#52b202",
                    },
                  }}
                />
                <Typography variant="body2" color="textSecondary">
                  {totalCaloriesBurned} Cals
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              sx={{
                padding: "15px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Box sx={{ padding: "15px", marginRight: "15px" }}>
                <img src={CaloriesBurnedIcon} alt="Calories Burned Icon" />
              </Box>
              <Box>
                <Typography variant="h6" color="text.secondary">
                  Average
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Calories Burned
                </Typography>
                <Typography
                  sx={{
                    fontSize: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                  color="text.secondary"
                  gutterBottom
                >
                  {isNaN(totalCaloriesBurned / totalWorkouts)
                    ? "0"
                    : (totalCaloriesBurned / totalWorkouts).toFixed(2)}
                </Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              sx={{
                padding: "15px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Box sx={{ padding: "15px", marginRight: "15px" }}>
                <img src={ActiveMinutesIcon} alt="Active Minutes Icon" />
              </Box>
              <Box>
                <Typography variant="h6" color="text.secondary">
                  Average
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Active Minutes
                </Typography>
                <Typography
                  sx={{
                    fontSize: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                  color="text.secondary"
                  gutterBottom
                >
                  {isNaN(totalDuration / totalWorkouts)
                    ? "0"
                    : (totalDuration / totalWorkouts).toFixed(2)}
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  };

  const WorkoutsList = () => {
    const [workouts, setWorkouts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust based on your preference
  
    const { data } = useQuery(GET_WORKOUTS_BY_USER, {
      variables: { userId },
    });
  
    useEffect(() => {
      if (data && data.workouts) {
        setWorkouts(data.workouts);
      }
    }, [data]);
  
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = workouts.slice(firstItemIndex, lastItemIndex);
  
    const totalPages = Math.ceil(workouts.length / itemsPerPage);
  
    const handleNext = () => {
      setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
    };
  
    const handlePrevious = () => {
      setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    };
  
    if (!workouts || workouts.length === 0) {
      return (
        <Box sx={{ margin: "20px", textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary">
            No workouts available
          </Typography>
        </Box>
      );
    }
  
    return (
      <div>
        <div className="workouts-scroll-container">
          {currentItems.map((workout) => (
            <WorkoutCard key={workout._id} workout={workout} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button onClick={handlePrevious} disabled={currentPage === 1}>
            Previous
          </Button>
          <Button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      </div>
    );
  };
  
  // WorkoutCard component remains unchanged

  const WorkoutCard = ({ workout }) => {
    const month = workout.dateOfWorkout.split("-")[1];
    const day = workout.dateOfWorkout.split("-")[2];
    const year = workout.dateOfWorkout.split("-")[0];
    const formattedDate = `${month}-${day}-${year}`;

    return (
      <div>
        <Card
          className="cardHoverEffect"
          sx={{ maxWidth: 345, margin: "20px" }}
        >
          <CardContent>
            <Box>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                }}
              >
                {workout.workoutTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formattedDate}
              </Typography>
            </Box>
            <Divider sx={{ width: "100%", my: 1 }} />
            <Box
              sx={{
                marginTop: "5px",
                marginBottom: "5px",
                display: "flex",
                justifyContent: "start",
              }}
            >
              <Whatshot />
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ marginLeft: "10px" }}
              >
                {workout.caloriesBurned} cals
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "start" }}>
              <Timer />
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ marginLeft: "10px" }}
              >
                {workout.duration} minutes
              </Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "end" }}>
            <IconButton
              aria-label="edit"
              onClick={() => handleEditOpen(workout)}
            >
              <Edit />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(workout._id)}
            >
              <Delete />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    );
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
      <Container>
        <Box>
          <WorkoutProgress></WorkoutProgress>

          <Divider sx={{ width: "100%", my: 4 }} />

          <Box mt={4} mb={2} width="100%">
            <Button
              variant="contained"
              color="success"
              onClick={handleClickOpen}
              sx={{ fontSize: "1.25rem", padding: "10px 20px" }} // Example of custom size
            >
              Add Workout
            </Button>
          </Box>

          <Divider sx={{ width: "100%", my: 4 }} />

          <Box mt={4} mb={2} width="100%">
            <Typography color="text.secondary" variant="h5" gutterBottom>
              Your Workouts
            </Typography>
            <WorkoutsList />
          </Box>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              {editMode ? "Edit Workout" : "Add Workout"}
            </DialogTitle>
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
                name="calories"
                label="Calories Burned"
                type="number"
                inputProps={{ min: "0" }}
                fullWidth
                value={formData.calories}
                onChange={handleChange}
                error={!!errors.calories}
                helperText={errors.calories}
              />
              <TextField
                margin="dense"
                name="duration"
                label="Duration (mins)"
                type="number"
                fullWidth
                inputProps={{ min: "1" }}
                value={formData.duration}
                onChange={handleChange}
                error={!!errors.duration}
                helperText={errors.duration}
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
      </Container>
    </Box>
  );
};

export default WorkoutComponent;
