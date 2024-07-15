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
  FormHelperText
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
  const [feeling, setFeelingType] = useState("");
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
      age: age,
      currentShape: activityLevel,
      workoutType: workoutType,
      location: location,
      feeling: feeling
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
    if (event.target.value) setErrors(prev => ({ ...prev, workoutType: false }));
  };

  const handleFeelingTypeChange = (event) => {
    setFeelingType(event.target.value);
    if (event.target.value) setErrors(prev => ({ ...prev, feelingType: false }));
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    if (event.target.value) setErrors(prev => ({ ...prev, location: false }));
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
    let newErrors = { workoutType: !workoutType, location: !location, feeling: !feeling };
    setErrors(newErrors);

    if (!newErrors.workoutType && !newErrors.location && !newErrors.feeling) {
      fetchWorkoutPlan()
    } else {
      console.log('Validation failed');
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
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 1 }}>
        <InputLabel style={{ marginRight: "8px" }}>Workout Type:</InputLabel>
        <FormControl error={errors.workoutType}>
          <Select
            value={workoutType}
            onChange={handleWorkoutTypeChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="" disabled>Select Workout Type</MenuItem>
            <MenuItem value="Endurance">Endurance</MenuItem>
            <MenuItem value="Strength">Strength</MenuItem>
            <MenuItem value="Speed">Speed</MenuItem>
            <MenuItem value="Flexibility">Flexibility</MenuItem>
          </Select>
          {errors.workoutType && <FormHelperText>Please select a workout type.</FormHelperText>}
        </FormControl>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
        <InputLabel style={{ marginRight: "8px" }}>Workout Location:</InputLabel>
        <FormControl error={errors.location}>
          <Select
            value={location}
            onChange={handleLocationChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="" disabled>Select Workout Location</MenuItem>
            <MenuItem value="Home">Home</MenuItem>
            <MenuItem value="Gym">Gym</MenuItem>
            <MenuItem value="Park">Park</MenuItem>
            <MenuItem value="Office">Office</MenuItem>
          </Select>
          {errors.location && <FormHelperText>Please select a workout location.</FormHelperText>}
        </FormControl>

        <InputLabel style={{ marginRight: "8px", marginBottom: "2px"}}>How Do You Feel:</InputLabel>
        <FormControl error={errors.feeling}>
          <Select
            value={feeling}
            onChange={handleFeelingTypeChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="" disabled>Select An Option</MenuItem>
            <MenuItem value="energized">Energized</MenuItem>
            <MenuItem value="gym">Tired</MenuItem>
            <MenuItem value="injured">Injured</MenuItem>
            <MenuItem value="sick">Sick</MenuItem>
          </Select>
          {errors.feeling && <FormHelperText>Please select an option.</FormHelperText>}
        </FormControl>
     
      
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
