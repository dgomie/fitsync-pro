import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx'
import HomePage from './pages/HomePage';
import LogInPage from './pages/loginPage.jsx';
import SignUpPage from './pages/signUpPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

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
        element: <LogInPage />
      },
      {path: "signUp",
        element: <SignUpPage/>
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
