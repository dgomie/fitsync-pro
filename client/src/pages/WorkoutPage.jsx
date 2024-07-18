import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from "../utils/auth";
import WorkoutComponent from '../components/WorkoutComponent';

const WorkoutPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.loggedIn());

  useEffect(() => {
    setIsLoggedIn(Auth.loggedIn());

    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div style={{ paddingTop: "70px" }}>
      <div style={{ flex: 1 }}>
        <WorkoutComponent />
      </div>
    </div>
  );
};

export default WorkoutPage;