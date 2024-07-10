import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import AIHelperComponent from "../components/AIHelper";

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
      <AIHelperComponent />
    </div>
  );
};

export default AIHelperPage;
