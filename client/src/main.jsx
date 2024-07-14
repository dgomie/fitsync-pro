import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PlansProvider } from './context/plans-context.jsx';

import App from './App.jsx'
import HomePage from './pages/HomePage';
import LoginPage from './pages/loginPage.jsx';
import SignUpPage from './pages/signUpPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AboutUs from './pages/AboutUsPage.jsx';
import SettingsPage from './pages/settingsPage.jsx';
import AIHelperPage from './pages/AIHelperPage.jsx'
import WorkoutPage from './pages/WorkoutPage.jsx';


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
        path: "settings",
        element: <SettingsPage />
      },
      {
        path: "fit-ai",
        element: <AIHelperPage />
      },
      {
        path: "workout",
        element: <WorkoutPage />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <PlansProvider>
      <RouterProvider router={router} />
  </PlansProvider>

);



