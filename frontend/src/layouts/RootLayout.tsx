import { Outlet } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import NavigationButtons from "../components/NavigationButtons";
import { useMediaQuery } from "react-responsive";

export default function RootLayout() {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  return (
    <div className="font-body">
      <Container className="w-full lg:w-xl">
        <Box className="flex items-center bg-primary p-8">
          <Typography
            variant="h3"
            component="div"
            className="flex-grow text-tertiary "
          >
            Speed Typing App
          </Typography>
          {isMobile ? null : <NavigationButtons />}
        </Box>
        <Outlet />
      </Container>
    </div>
  );
}
