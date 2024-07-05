import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilePageComponent from "../components/ProfilePageComponent";
import Auth from "../utils/auth";

const ProfilePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = Auth.loggedIn(); 

        if (!isLoggedIn) {
            navigate('/login'); 
        }
    }, [navigate]);

    return (
        <ProfilePageComponent />
    );
};

export default ProfilePage;