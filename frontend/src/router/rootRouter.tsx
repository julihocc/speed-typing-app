import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/DashboardLayout.tsx";
import SignUp from "../pages/SignUp.tsx";

// Components
import MatchRecordViewer from "../components/MatchRecordViewer";
import HistoricalMatchAccuracy from "../components/HistoricalMatchAccuracy";
import SpeedWatcher from "../components/SpeedWatcher";

// layouts
import RootLayouts from "../layouts/RootLayout.tsx";
import PrivateLayout from "../layouts/PrivateLayout.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayouts />}>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signUp" element={<SignUp />} />
      <Route element={<PrivateLayout />}>
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="speedwatcher" element={<SpeedWatcher />} />
          <Route
            path="historicalmatchaccuracy"
            element={<HistoricalMatchAccuracy />}
          />
          <Route path="matchrecordviewer" element={<MatchRecordViewer />} />
        </Route>
      </Route>
    </Route>
  )
);

export default router;
