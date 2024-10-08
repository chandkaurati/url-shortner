import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/app-layout";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import { login } from "./store/authSclice";
import { useDispatch } from "react-redux";
import authService from "./db/auth-service";
import RedirectLink from "./pages/redirectlink";
import NotFoundPage from "./pages/notFound";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
      {
        path: "/404",
        element: <NotFoundPage />,
      },
    ],
  },
]);
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const userData = await authService.getCurrentSession();
      if (userData?.access_token) {
        dispatch(login({ userData }));
      }
    })();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
