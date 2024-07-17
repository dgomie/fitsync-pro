import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation, useQuery } from "@apollo/client";
import { REMOVE_USER, UPDATE_USER } from "../utils/mutations";
import { GET_USER } from "../utils/queries";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";

const SettingsComponent = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [firstName, setFirstName] = useState("First Name");
  const [lastName, setLastName] = useState("Last Name");
  const [email, setEmail] = useState("Email");
  const [activityLevel, setActivityLevel] = useState("");
  const [workoutGoal, setWorkoutGoal] = useState("");
  const [durationGoal, setDurationGoal] = useState("")
  const [userId, setUserId] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [removeUserMutation] = useMutation(REMOVE_USER);
  const [updateUser] = useMutation(UPDATE_USER);

  const token = Auth.getToken();
  const { _id } = Auth.getProfile(token).data;

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId: _id },
  });

  useEffect(() => {
    if (data) {
      setFirstName(data.user.firstName);
      setLastName(data.user.lastName);
      setEmail(data.user.email);
      setActivityLevel(data.user.activityLevel);
      setUserId(data.user._id);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    removeUserMutation({ variables: { userId } })
      .then((response) => {
        console.log("User removed:", response.data.removeUser);
        Auth.logout();
        navigate("/");
      })
      .catch((err) => {
        console.error("Error removing user:", err);
      });
  };

  const handleUpdateProfile = async () => {
    const updateData = {
      firstName,
      lastName,
      email,
      activityLevel,
    };
    try {
      const response = await updateUser({
        variables: { userId, updateData },
      });
      console.log("Update successful", response);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 5000);
    } catch (error) {
      console.log("Error details:", error);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
      sx={{ paddingTop: "100px", paddingBottom: "100px" }}
    >
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: { xs: 2, sm: 4, md: 6 } }}>
          <Typography variant="h2" component="header" gutterBottom>
            Settings
          </Typography>
          <Box component="main" sx={{ width: "100%" }}>
            <Box mb={4}>
              <Typography variant="h4" component="h2" gutterBottom>
                Profile Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="exercise-experience-select-label">
                      Exercise Experience
                    </InputLabel>
                    <Select
                      labelId="exercise-experience-label"
                      id="exercise-experience-select"
                      value={activityLevel}
                      onChange={(e) => setActivityLevel(e.target.value)}
                      label="Exercise Experience"
                    >
                      <MenuItem value="Beginner">Beginner</MenuItem>
                      <MenuItem value="Intermediate">Intermediate</MenuItem>
                      <MenuItem value="Advanced">Advanced</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <TextField
                      id="workout-goal-input"
                      label="Monthly Workout Goal"
                      type="number"
                      value={workoutGoal}
                      onChange={(e) => setWorkoutGoal(Number(e.target.value))}
                      variant="outlined"
                      inputProps={{ min: "0" }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <TextField
                      id="duration-goal-input"
                      label="Monthly Duration Goal (mins)"
                      type="number"
                      value={durationGoal}
                      onChange={(e) => setDurationGoal(Number(e.target.value))}
                      variant="outlined"
                      inputProps={{ min: "0" }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateProfile}
                >
                  Update Profile
                </Button>
                <div>
                  {updateSuccess && (
                    <div className="mt-1">Profile updated successfully!</div>
                  )}
                </div>
              </Box>
            </Box>
            <Box mb={4}>
              <Typography variant="h4" component="h2" gutterBottom>
                Change Password
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="New Password"
                    type={showNewPassword ? "text" : "password"}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                            edge="end"
                          >
                            {showNewPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type={showConfirmPassword ? "text" : "password"}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button variant="contained" color="primary">
                  Change Password
                </Button>
              </Box>
            </Box>
            <Box mb={4}>
              <Typography variant="h4" component="h2" gutterBottom>
                Delete Account
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClickOpen}
              >
                Delete Account
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Delete Account"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete your account? This action
                    cannot be undone.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleDelete} color="secondary" autoFocus>
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SettingsComponent;
