import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/Login/login";
import SendOtp from "./components/Login/sendOtp";
import UserDetails from "./components/Login/userDetailes";
import UserRegister from "./components/Login/register";
import Login from "./components/Login/UserLogin.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/sendOtp",
      element: <SendOtp />,
    },
    {
      path: "/userDetails",
      element: <UserDetails />,
    },
    {
      path: "/register",
      element: <UserRegister />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
