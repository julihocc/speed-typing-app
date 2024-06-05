import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../layouts/DashboardLayout.tsx";
import SignUp from "../pages/SignUp.tsx";
import NotFound from "../pages/NotFound.tsx";

// Components
import MatchRecordViewer from "../components/MatchRecordViewer";
import HistoricalMatchAccuracy from "../components/HistoricalMatchAccuracy";
import SpeedWatcher from "../components/SpeedWatcher";

// layouts
import RootLayouts from "../layouts/MainLayout.tsx";
import ProtectedRoutes from "./ProtectedRoutes.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayouts />}>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signUp" element={<SignUp />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="speedwatcher" element={<SpeedWatcher />} />
          <Route
            path="historicalmatchaccuracy"
            element={<HistoricalMatchAccuracy />}
          />
          <Route path="matchrecordviewer" element={<MatchRecordViewer />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
