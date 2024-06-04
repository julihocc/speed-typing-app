import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container maxWidth="sm">
      <Box className="mt-8 mb-4">
        <Typography variant="h2" gutterBottom>
          404
        </Typography>
        <Typography variant="subtitle1">
          Sorry, we couldn't find the page you're looking for.
        </Typography>
        <Box className="mt-4">
          <Link to="/">
            <Button variant="contained" color="primary">
              Go Back Home
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
