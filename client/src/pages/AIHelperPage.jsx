import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import AIHelperComponent from "../components/AIHelperComponent";
import SavedPlansComponent from "../components/SavedPlansComponent"

const AIHelperPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = Auth.loggedIn();

    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div style={{ marginTop: "80px" }}>
      <div style={{ flex: 1 }}>
        <SavedPlansComponent />
      </div>
      <div style={{ flex: 3, marginBottom: "80px" }}>
        <AIHelperComponent />
      </div>
    </div>
  );
};

export default AIHelperPage;
