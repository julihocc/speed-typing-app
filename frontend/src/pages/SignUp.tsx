import React, { useState } from "react";
import PageLayout from "../layouts/PageLayout";
import { NavLink } from "react-router-dom";

import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Link,
} from "@mui/material";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Basic client-side validation (add more as needed)
    if (password !== confirmPassword) {
      // Handle password mismatch error (e.g., show error message)
      return;
    }

    // Here, you'd typically add your sign-up logic (API call, validation, etc.)
    console.log("Sign-up submitted:", { name, email, password });
  };

  return (
    <PageLayout title="Sign up">
      <Container maxWidth="xs">
        <Box mt={8} p={3} boxShadow={3}>
          <Typography variant="h5" align="center" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Sign Up
            </Button>
          </form>
          <Box mt={2} textAlign="center">
            {/* <Link href="/login" underline="hover">
              Already have an account? Login
            </Link> */}
            <NavLink to="/Login">Already have an account? Login</NavLink>
          </Box>
        </Box>
      </Container>
    </PageLayout>
  );
}

export default SignUp;
