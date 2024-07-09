import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Workouts from "../components/Workouts";
import Auth from "../utils/auth";

const WorkoutPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = Auth.loggedIn(); 

        if (!isLoggedIn) {
            navigate('/login'); 
        }
    }, [navigate]);

    return (
        <Workouts />
    );
};

export default WorkoutPage;