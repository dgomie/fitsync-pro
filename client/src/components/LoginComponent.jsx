import { useState } from "react";

import { TextField, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

function LoginComponent() {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [login] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
      setErrorMessage("Incorrect username or password!");
    }

    // clear form values
    setFormState({
      username: "",
      password: "",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        paddingTop: "100px",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center" }}
      >
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          backgroundColor: "#b4c4ab",
          padding: "5rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "25rem",
        }}
      >
        <TextField
          label="Username"
          variant="outlined"
          id="username"
          name="username"
          value={formState.username}
          onChange={handleChange}
          required
          InputProps={{
            style: { backgroundColor: "white" },
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          id="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          required
          InputProps={{
            style: { backgroundColor: "white" },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 1,
            backgroundColor: "#46563c",
            "&:hover": {
              backgroundColor: "#869f76",
            },
            width: "10%",
            minWidth: "120px",
            marginTop: 3,
          }}
        >
          Login
        </Button>
        {errorMessage && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        )}
        <Typography sx={{ marginTop: 3 }}>
          Don't have an account?{" "}
          <Link
            to="/signUp"
            style={{
              color: "#46563c",
              fontWeight: "bold",
              textDecoration: "none",
              "&:hover": { color: "#869f76" },
            }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginComponent;
