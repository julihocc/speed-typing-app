import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import SignUp from "../pages/SignUp.tsx";

// layouts
import RootLayouts from "../layouts/RootLayout.tsx";
import PrivateLayout from "../layouts/PrivateLayout.tsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayouts />}>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route element={<PrivateLayout />}>
        <Route path="/Dashboard" element={<Dashboard />} />
      </Route>
    </Route>
  )
);

export default router;
