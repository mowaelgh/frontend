import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CustomRoutes from "./routes";
import {  useAuth } from "./hooks/auth";
import LoadingPage from "./pages/loading";

export const App = () => {
  const { isLoaded } = useAuth();
  
  if (!isLoaded) return <LoadingPage />;

  const router = createBrowserRouter(CustomRoutes());

  return (
    <RouterProvider router={router} />
  );
};

