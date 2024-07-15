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
} from "@mui/material";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { CREATE_AI_PLAN } from "../utils/mutations";
import MuiAlert from "@mui/material/Alert";
import { usePlans } from "../context/plans-context";

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
      console.log("payload:", payload);
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
      bodyPart
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
        console.log(response);
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
      const titleMatch = section.match(/^\*\*(.*)\*\*$/);
      if (titleMatch) {
        return (
          <Typography variant="h6" key={index} style={{ marginTop: "20px" }}>
            {titleMatch[1]}
          </Typography>
        );
      }
      const listMatch = section.match(/^\*\s(.*)$/gm);
      if (listMatch) {
        return (
          <ul key={index} style={{ marginLeft: "20px" }}>
            {listMatch.map((item, i) => (
              <li key={i}>{item.replace(/^\*\s/, "")}</li>
            ))}
          </ul>
        );
      }
      return (
        <Typography key={index} paragraph>
          {section}
        </Typography>
      );
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 1,
        }}
      >
        <InputLabel style={{ marginRight: "8px" }}>Workout Type:</InputLabel>
        <FormControl error={errors.workoutType}>
          <Select
            value={workoutType}
            onChange={handleWorkoutTypeChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="" disabled>
              Select Workout Type
            </MenuItem>
            <MenuItem value="Endurance">Endurance</MenuItem>
            <MenuItem value="Strength">Strength</MenuItem>
            <MenuItem value="Speed">Speed</MenuItem>
            <MenuItem value="Flexibility">Flexibility</MenuItem>
          </Select>
          {errors.workoutType && (
            <FormHelperText>Please select a workout type.</FormHelperText>
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
        <InputLabel style={{ marginRight: "8px" }}>
          Workout Location:
        </InputLabel>
        <FormControl error={errors.location}>
          <Select
            value={location}
            onChange={handleLocationChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="" disabled>
              Select Workout Location
            </MenuItem>
            <MenuItem value="Home">Home</MenuItem>
            <MenuItem value="Gym">Gym</MenuItem>
            <MenuItem value="Park">Park</MenuItem>
            <MenuItem value="Office">Office</MenuItem>
          </Select>
          {errors.location && (
            <FormHelperText>Please select a workout location.</FormHelperText>
          )}
        </FormControl>

        <InputLabel style={{ marginRight: "8px" }}>
          Target Muscle Group:
        </InputLabel>
        <FormControl error={errors.bodyPart}>
          <Select
            value={bodyPart}
            onChange={handleBodyPartChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="" disabled>
              Select Target Muscle Group
            </MenuItem>
            <MenuItem value="upper body">Upper Body</MenuItem>
            <MenuItem value="lower body">Lower Body</MenuItem>
            <MenuItem value="arms">Arms</MenuItem>
            <MenuItem value="legs">Legs</MenuItem>
            <MenuItem value="core">Core</MenuItem>
          </Select>
          {errors.bodyPart && (
            <FormHelperText>Please select a target muscle group.</FormHelperText>
          )}
        </FormControl>

        <InputLabel style={{ marginRight: "8px", marginBottom: "2px" }}>
          Week Number:
        </InputLabel>
        <FormControl error={errors.week}>
          <TextField
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={week}
            onChange={handleWeekChange}
            error={errors.week}
            helperText={errors.week ? "Please select a week number." : ""}
            inputProps={{ min: "1", max: "100", "aria-label": "Without label" }}
            style={{ marginRight: "8px", marginBottom: "2px" }}
          />
          {errors.week && (
            <FormHelperText>Please select an option.</FormHelperText>
          )}
        </FormControl>

        <Button type="submit" variant="contained" color="success" sx={{ m: 2 }}>
          Generate Workout Plan
        </Button>

        {isLoading ? (
          <CircularProgress color="success" />
        ) : data ? (
          <Box sx={{ width: "100%", maxWidth: 600 }}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Your Workout Plan
                </Typography>
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
                  autoHideDuration={6000}
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
            </Card>
          </Box>
        ) : null}
      </Box>
    </form>
  );
}

export default AIHelperComponent;
