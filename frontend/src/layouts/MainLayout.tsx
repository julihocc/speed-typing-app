import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import NavigationButtons from "../components/NavigationButtons";
import { useMediaQuery } from "react-responsive";
import NavigationDrawer from "../components/NavigationDrawer";

export default function MainLayout() {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  return (
    <div className="font-body">
      <Container className="w-full lg:w-xl">
        <div className="flex items-center bg-primary p-8">
          {isMobile && <NavigationDrawer />}
          <div className="flex-grow text-tertiary font-mono text-3xl lg:text-7xl font-bold">
            Speed Typing App
          </div>
          {!isMobile && <NavigationButtons />}
        </div>
        <Outlet />
      </Container>
    </div>
  );
}
