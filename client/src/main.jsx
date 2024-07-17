import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PlansProvider } from "./context/plansContext.jsx";

import App from "./App.jsx";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AboutUs from "./pages/AboutUsPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import AIHelperPage from "./pages/AIHelperPage.jsx";
import WorkoutPage from "./pages/WorkoutPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signUp",
        element: <SignUpPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "fit-ai",
        element: <AIHelperPage />,
      },
      {
        path: "workout",
        element: <WorkoutPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <PlansProvider>
    <RouterProvider router={router} />
  </PlansProvider>
);
