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
} from "@mui/material";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { CREATE_AI_PLAN } from "../utils/mutations";
import MuiAlert from "@mui/material/Alert";

function AIHelperComponent() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [workoutType, setWorkoutType] = useState("");
  const [location, setLocation] = useState("");
  const [token, setToken] = useState("");
  const [userId, setId] = useState("");
  const [age, setAge] = useState(null);
  const [activityLevel, setActivityLevel] = useState("");
  const [createAIplan] = useMutation(CREATE_AI_PLAN);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
    };
    const urlEndpoint = import.meta.env.VITE_AI_ENDPOINT_URL
    const hostUrl = import.meta.env.VITE_HOST_URL;
    const endpoint = `${hostUrl}${urlEndpoint}`
    console.log("api endpoint:", endpoint)
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
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
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
    <form onSubmit={fetchWorkoutPlan}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
          pt: 5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <InputLabel style={{ marginRight: "8px" }}>Workout Type:</InputLabel>
          <Select
            value={workoutType}
            onChange={handleWorkoutTypeChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{ mb: 2 }}
          >
            <MenuItem value="" disabled>
              Select Workout Type
            </MenuItem>
            <MenuItem value="Endurance">Endurance</MenuItem>
            <MenuItem value="Strength">Strength</MenuItem>
            <MenuItem value="Speed">Speed</MenuItem>
            <MenuItem value="Flexibility">Flexibility</MenuItem>
          </Select>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <InputLabel style={{ marginRight: "8px" }}>
            Workout Location:
          </InputLabel>
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
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
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
