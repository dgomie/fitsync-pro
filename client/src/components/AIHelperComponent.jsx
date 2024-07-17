import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Snackbar,
  Box,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  TextField,
  Paper,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { CREATE_AI_PLAN } from "../utils/mutations";
import MuiAlert from "@mui/material/Alert";
import { usePlans } from "../context/plansContext";

function AIHelperComponent() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [workoutType, setWorkoutType] = useState("");
  const [location, setLocation] = useState("");
  const [week, setWeek] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [token, setToken] = useState("");
  const [userId, setId] = useState("");
  const [age, setAge] = useState(null);
  const [activityLevel, setActivityLevel] = useState("");
  const [createAIplan] = useMutation(CREATE_AI_PLAN);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { plans, setPlans } = usePlans();
  const [errors, setErrors] = useState({ workoutType: false, location: false });

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    const token = localStorage.getItem("id_token");
    if (token) {
      setToken(token);
      const payload = JSON.parse(atob(token.split(".")[1]));
      const { _id, age, activityLevel } = payload.data;
      setId(_id);
      setAge(age);
      setActivityLevel(activityLevel);
    }
  }, []);

  const fetchWorkoutPlan = () => {
    event.preventDefault();
    setIsLoading(true);
    const postData = {
      age,
      activityLevel,
      workoutType,
      location,
      week,
      bodyPart,
    };

    const hostUrl = import.meta.env.VITE_HOST_URL;
    const apiUrl = import.meta.env.VITE_AI_ENDPOINT_URL;
    const endpoint = `${hostUrl}${apiUrl}`;

    axios
      .post(endpoint, postData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setIsLoading(false);
      });
  };

  const handleWorkoutTypeChange = (event) => {
    setWorkoutType(event.target.value);
    if (event.target.value)
      setErrors((prev) => ({ ...prev, workoutType: false }));
  };

  const handleBodyPartChange = (event) => {
    setBodyPart(event.target.value);
    if (event.target.value) setErrors((prev) => ({ ...prev, bodyPart: false }));
  };

  const handleWeekChange = (event) => {
    setWeek(event.target.value);
    if (event.target.value) setErrors((prev) => ({ ...prev, week: false }));
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    if (event.target.value) setErrors((prev) => ({ ...prev, location: false }));
  };

  const handleSave = () => {
    const title = `${location} ${workoutType} Workout`;

    createAIplan({
      variables: {
        userId,
        title,
        plan: data.workoutPlan,
      },
    })
      .then((response) => {
        setSaveSuccess(true);
        setOpenSnackbar(true);
        console.log("Plan created successfully", response);
        const newPlan = response.data.createAIplan;
        setPlans((prevPlans) => [...prevPlans, newPlan]); // Update the plans context
      })
      .catch((error) => {
        setSaveSuccess(false);
        console.error(
          "Error creating plan:",
          error.networkError ? error.networkError.result : error.message
        );
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newErrors = {
      workoutType: !workoutType,
      location: !location,
      week: !week,
      bodyPart: !bodyPart,
    };
    setErrors(newErrors);

    if (
      !newErrors.workoutType &&
      !newErrors.location &&
      !newErrors.week &&
      !newErrors.bodyPart
    ) {
      fetchWorkoutPlan();
    } else {
      console.log("Validation failed");
    }
  };

  const renderWorkoutPlan = (plan) => {
    const cleanedPlan = plan.replace(/^##/, "").trim();
    const sections = cleanedPlan.split("\n\n");
    return sections.map((section, index) => {
      // Check for sections that should be entirely bold
      const titleMatch = section.match(/^\*\*(.*)\*\*$/);
      if (titleMatch) {
        return (
          <Typography
            variant="h6"
            key={index}
            style={{ marginTop: "20px", fontWeight: "bold" }}
          >
            {titleMatch[1]}
          </Typography>
        );
      }
      const listMatch = section.match(/^\*\s(.*)$/gm);
      if (listMatch) {
        return (
          <ul key={index} style={{ marginLeft: "20px" }}>
            {listMatch.map((item, i) => (
              <li key={i}>{parseBoldText(item.replace(/^\*\s/, ""))}</li>
            ))}
          </ul>
        );
      }
      // Handle mixed content with bold and regular text
      return (
        <Typography key={index} paragraph>
          {parseBoldText(section)}
        </Typography>
      );
    });
  };

  // Helper function to parse **bold** text
  const parseBoldText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g); // Split text at **bold** parts
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <span key={index} style={{ fontWeight: "bold" }}>
            {part.slice(2, -2)}
          </span>
        );
      }
      return part; // Return regular text as is
    });
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: "15px" }}>
      <Typography variant="h5" component="div" align="center">
        Create Your Fit-AI Plan
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column", // On extra-small screens, use column layout
              md: "row", // On small screens (and up), use row layout
            },
            justifyContent: {
              md: "space-around", // On small screens (and up), use space-around
              xs: "center", // On extra-small screens, center content
            },
            alignItems: "center", // Center-align items vertically
            mb: 1,
            mt: 2,
          }}
        >
          <FormControl
            error={errors.workoutType}
            sx={{
              width: {
                xs: "80%",
                md: "20%",
              },
              marginBottom: {
                xs: "5px",
              },
            }}
          >
            <InputLabel id="location-label">Workout Type</InputLabel>
            <Select
              labelId="location-label"
              value={workoutType}
              onChange={handleWorkoutTypeChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="" disabled></MenuItem>
              <MenuItem value="Endurance">Endurance</MenuItem>
              <MenuItem value="Strength">Strength</MenuItem>
              <MenuItem value="Speed">Speed</MenuItem>
              <MenuItem value="Flexibility">Flexibility</MenuItem>
            </Select>
            {errors.workoutType && (
              <FormHelperText>Please select a workout type.</FormHelperText>
            )}
          </FormControl>

          <FormControl
            error={errors.location}
            sx={{
              width: {
                xs: "80%",
                md: "20%",
              },
              marginBottom: {
                xs: "5px",
              },
            }}
          >
            <InputLabel id="location-label">Workout Location</InputLabel>
            <Select
              labelId="location-label"
              value={location}
              onChange={handleLocationChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="" disabled></MenuItem>
              <MenuItem value="Home">Home</MenuItem>
              <MenuItem value="Gym">Gym</MenuItem>
              <MenuItem value="Park">Park</MenuItem>
            </Select>
            {errors.location && (
              <FormHelperText>Please select a workout location.</FormHelperText>
            )}
          </FormControl>

          <FormControl
            error={errors.bodyPart}
            sx={{
              width: {
                xs: "80%",
                md: "20%",
              },
              marginBottom: {
                xs: "5px",
              },
            }}
          >
            <InputLabel id="body-part-label">Target Muscle Group</InputLabel>
            <Select
              labelId="body-part-label"
              value={bodyPart}
              onChange={handleBodyPartChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="" disabled></MenuItem>
              <MenuItem value="full body">Full Body</MenuItem>
              <MenuItem value="upper body">Upper Body</MenuItem>
              <MenuItem value="lower body">Lower Body</MenuItem>
              <MenuItem value="arms">Arms</MenuItem>
              <MenuItem value="legs">Legs</MenuItem>
              <MenuItem value="core">Core</MenuItem>
            </Select>
            {errors.bodyPart && (
              <FormHelperText>
                Please select target muscle group.
              </FormHelperText>
            )}
          </FormControl>

          <FormControl
            error={errors.week}
            sx={{
              width: {
                xs: "80%",
                md: "20%",
              },
              marginBottom: {
                xs: "5px",
              },
            }}
          >
            <InputLabel id="week-label">Plan Duration</InputLabel>
            <Select
              labelId="week-label"
              value={week}
              onChange={handleWeekChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="" disabled></MenuItem>
              <MenuItem value="one">One Week</MenuItem>
              <MenuItem value="two">Two Weeks</MenuItem>
              <MenuItem value="three">Three Weeks</MenuItem>
              <MenuItem value="four">Four Weeks</MenuItem>
            </Select>
            {errors.week && (
              <FormHelperText>Please select a plan duration.</FormHelperText>
            )}
          </FormControl>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ m: 2 }}
          >
            Generate Workout Plan
          </Button>

          {isLoading ? (
            <CircularProgress color="success" />
          ) : data ? (
            <Box sx={{ width: "100%", maxWidth: 6800 }}>
              <div>
                <CardContent>
                  <Typography variant="h5" component="div" align="center">
                    Your Fit-AI Workout
                  </Typography>
                  <Divider style={{ margin: "8px 0" }} />
                  {renderWorkoutPlan(data.workoutPlan)}
                </CardContent>
                <Box display="flex" justifyContent="center" p={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                  >
                    Save Plan
                  </Button>
                  <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                  >
                    <Alert
                      onClose={handleCloseSnackbar}
                      severity={saveSuccess ? "success" : "error"}
                    >
                      {saveSuccess
                        ? "Plan saved successfully!"
                        : "Error saving plan."}
                    </Alert>
                  </Snackbar>
                </Box>
              </div>
            </Box>
          ) : null}
        </Box>
      </form>
    </Paper>
  );
}

export default AIHelperComponent;
