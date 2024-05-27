import PageLayout from "../layouts/PageLayout";
import { NavLink } from "react-router-dom";
import { useState } from "react";
// import useIndexedStore from "../../stores/indexed-store";
import useIndexedStore from "../stores/indexed-store";
import useBoundStore from "../stores/bound-store";
import { encrypt } from "../utils/encrypt";
import { useNavigate } from "react-router-dom";

import { TextField, Button, Typography, Container, Box } from "@mui/material";

export default function Login() {
  const [capturedEmail, setCapturedEmail] = useState("");
  const [capturedPassword, setCapturedPassword] = useState("");
  const { getUserByEmail } = useIndexedStore();
  const {
    setCurrentUserEmail,
    setCurrentUserIsAuthenticated,
    setCurrentUserMatchRecords,
  } = useBoundStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Logging in with ${capturedEmail} and ${capturedEmail}`);
    const user = getUserByEmail(capturedEmail);
    console.log("Current user", user);
    if (!user) {
      console.error("User not found");
      return;
    }
    if (user.password !== encrypt(capturedPassword)) {
      console.error("Invalid password");
      return;
    }
    setCurrentUserEmail(user.email);
    setCurrentUserIsAuthenticated(user.password === encrypt(capturedPassword));
    setCurrentUserMatchRecords(user.matchRecords);
    setCapturedEmail("");
    setCapturedPassword("");

    return navigate("/Dashboard");
  };

  return (
    <PageLayout title="Login">
      <Container maxWidth="xs">
        <Box mt={8} p={3} boxShadow={3}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={capturedEmail}
              onChange={(e) => setCapturedEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={capturedPassword}
              onChange={(e) => setCapturedPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </form>
          <Box mt={2} textAlign="center">
            <NavLink to="/SignUp">Don't have an account? Sign Up</NavLink>
          </Box>
        </Box>
      </Container>
    </PageLayout>
  );
}
