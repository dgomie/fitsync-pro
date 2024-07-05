import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginComponent from "../components/LoginComponent";
import Auth from "../utils/auth";

function LoginPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = Auth.loggedIn(); 

        if (isLoggedIn) {
            navigate('/profile'); 
        }
    }, [navigate]);

    return (
        <div>
            <LoginComponent />
        </div>
    );
}

export default LoginPage;
