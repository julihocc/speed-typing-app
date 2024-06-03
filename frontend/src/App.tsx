import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp.tsx";
import PrivateLayout from "./router/PrivateLayout.tsx";

// layouts
import RootLayouts from "./router/RootLayout.tsx";

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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
