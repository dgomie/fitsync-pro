import React, { useState, useEffect } from 'react';
import { Snackbar, Box, Grid, Button, CircularProgress, Card, CardContent, Typography, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { CREATE_AI_PLAN } from '../utils/mutations';
import MuiAlert from '@mui/material/Alert';

function Workouts() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [workoutType, setWorkoutType] = useState('');
  const [location, setLocation] = useState('');
  const [token, setToken] = useState('');
  const [userId, setId] = useState('');
  const [age, setAge] = useState(null);
  const [activityLevel, setActivityLevel] = useState('');
  const [createAIplan] = useMutation(CREATE_AI_PLAN);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);


  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


  useEffect(() => {
    const token = localStorage.getItem('id_token');
    if (token) {
      setToken(token);
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log("payload:", payload);
      const { _id, age, activityLevel } = payload.data; 
      setId(_id)
      setAge(age);
      setActivityLevel(activityLevel);
    }
  }, []);

  const fetchWorkoutPlan = () => {
    setIsLoading(true);
    const postData = {
      age: age,
      currentShape: activityLevel,
      workoutType: workoutType,
      location: location,
    };

    const endpoint = 'http://localhost:3001/api/generateWorkoutPlan';

    axios
      .post(endpoint, postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('There was an error!', error);
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
    console.log("Age:", age, "Activity Level:", activityLevel, "id:", userId);
    console.log(data.workoutPlan)
  
    createAIplan({
      variables: {
        userId,
        plan: data.workoutPlan
      },
    })
      .then(response => {
        setSaveSuccess(true);
        setOpenSnackbar(true);
        console.log("Plan created successfully", response);
      })
      .catch(error => {
        setSaveSuccess(false);
        console.error("Error creating plan:", error.networkError ? error.networkError.result : error.message);
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const renderWorkoutPlan = (plan) => {
    const sections = plan.split('\n\n');
    return sections.map((section, index) => {
      const titleMatch = section.match(/^\*\*(.*)\*\*$/);
      if (titleMatch) {
        return <Typography variant="h6" key={index} style={{ marginTop: '20px' }}>{titleMatch[1]}</Typography>;
      }
      const listMatch = section.match(/^\*\s(.*)$/gm);
      if (listMatch) {
        return (
          <ul key={index} style={{ marginLeft: '20px' }}>
            {listMatch.map((item, i) => (
              <li key={i}>{item.replace(/^\*\s/, '')}</li>
            ))}
          </ul>
        );
      }
      return <Typography key={index} paragraph>{section}</Typography>;
    });
  };

  return (
    <Grid container spacing={2} justifyContent="center" className='mt-5 pt-5'>
      <Grid item>
        <Select
          value={workoutType}
          onChange={handleWorkoutTypeChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="" disabled>
            Select Workout Type
          </MenuItem>
          <MenuItem value="endurance">Endurance</MenuItem>
          <MenuItem value="strength">Strength</MenuItem>
          <MenuItem value="speed">Speed</MenuItem>
          <MenuItem value="flexibility">Flexibility</MenuItem>
        </Select>
      </Grid>
      <Grid item>
        <Select
          value={location}
          onChange={handleLocationChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="" disabled>
            Select Workout Location
          </MenuItem>
          <MenuItem value="home">Home</MenuItem>
          <MenuItem value="gym">Gym</MenuItem>
        </Select>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={fetchWorkoutPlan}>
          Generate Workout Plan
        </Button>
      </Grid>
      {isLoading ? (
        <CircularProgress />
      ) : data ? (
        <Grid item xs={12} sm={6} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Workout Plan
            </Typography>
            {renderWorkoutPlan(data.workoutPlan)}
          </CardContent>
          <Box display="flex" justifyContent="center" p={1}>
          <div>
      <Button variant="contained" color="primary" onClick={handleSave}>Save Plan</Button>
      {/* Step 4: Conditionally render the confirmation message */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={saveSuccess ? "success" : "error"}>
          {saveSuccess ? "Plan saved successfully!" : "Error saving plan."}
        </Alert>
      </Snackbar>
    </div>
          </Box>
        </Card>
      </Grid>
      ) : null}
    </Grid>
  );
}

export default Workouts;