import { useState, useEffect } from 'react';
import { Grid, Button, CircularProgress, Card, CardContent, Typography, Select, MenuItem } from '@mui/material';
import axios from 'axios';

function Workouts() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [workoutType, setWorkoutType] = useState('');
    // Add state for age and activityLevel
    const [token, setToken] = useState('');
    const [age, setAge] = useState(null);
    const [activityLevel, setActivityLevel] = useState('');

    useEffect(() => {
      const token = localStorage.getItem('id_token');
      if (token) {
        setToken(token)
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log("payload:", payload);
        const { age, activityLevel } = payload.data; // Assuming these fields are in the token payload
        console.log("Age:", age, "Activity Level:", activityLevel);
        // Update state with age and activityLevel
        setAge(age);
        setActivityLevel(activityLevel);
      }
    }, []);

    const fetchWorkoutPlan = () => {
      setIsLoading(true);
      const postData = {
        "age": age, // Use age from state
        "currentShape": activityLevel, // Use activityLevel from state, assuming it maps to currentShape
        "workoutType": workoutType // Use the selected workout type
      };

    const endpoint = 'http://localhost:3001/api/generateWorkoutPlan';

    axios.post(endpoint, postData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(response);
      setData(response.data);
      setIsLoading(false);
    })
    .catch(error => {
      console.error('There was an error!', error);
      setIsLoading(false);
    });
  };

  const handleWorkoutTypeChange = (event) => {
    setWorkoutType(event.target.value);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
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
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Workout Plan
              </Typography>
              <Typography variant="body2">
                {data.workoutPlan}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ) : null}
    </Grid>
  );
}

export default Workouts;