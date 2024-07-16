import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from "../utils/auth";
import AIHelperComponent from "../components/AIHelperComponent";
import SavedPlansComponent from "../components/SavedPlansComponent";

const AIHelperPage = () => {
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
    <div style={{paddingTop:"100px" }}>
        <div style={{ flex: 1 }}>
        <SavedPlansComponent />
      </div>
      <div style={{ flex: 3, marginBottom: "40px" }}>
        <AIHelperComponent />
      </div>
    </div>
  );
};

export default AIHelperPage;
