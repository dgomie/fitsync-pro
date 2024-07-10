import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx'
import HomePage from './pages/HomePage';
import LoginPage from './pages/loginPage.jsx';
import SignUpPage from './pages/signUpPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AboutUs from './pages/AboutUsPage.jsx';
import GetStartedPage from './pages/GetStartedPage.jsx';
import SettingsPage from './pages/settingsPage.jsx';
import Workouts from './components/Workouts.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "signUp",
        element: <SignUpPage />
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "about-us",
        element: <AboutUs />
      },
      {
        path: "get-started",
        element: <GetStartedPage />
      },
      {
        path: "settings",
        element: <SettingsPage />
      },
      {
        path: "workouts",
        element: <Workouts />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);



