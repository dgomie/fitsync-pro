import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from "../utils/auth";
import SettingsComponent from '../components/SettingsComponent';

const SettingsPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = Auth.loggedIn(); 

        if (!isLoggedIn) {
            navigate('/login'); 
        }
    }, [navigate]);

    return (
        <SettingsComponent />
    );
};

export default SettingsPage;