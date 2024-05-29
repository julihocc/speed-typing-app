import React, { useState } from "react";
import PageLayout from "../layouts/PageLayout";
import { NavLink } from "react-router-dom";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import useIndexedStore from "../stores/indexed-store";
import { useNavigate } from "react-router-dom";
import { encrypt } from "../utils/encrypt";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [avatar, setAvatar] = useState("");
  const { addUser, getUserByEmail } = useIndexedStore();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const existingUser = getUserByEmail(email);

    if (existingUser) {
      console.error("User already exists");
      return;
    }

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    const newUser: IUser = {
      firstName,
      lastName,
      email,
      password: encrypt(password),
      avatar: "",
      matchRecords: [],
    };

    addUser(newUser);

    return navigate("/Login");
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
              label="Firstname"
              fullWidth
              margin="normal"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Lastname"
              fullWidth
              margin="normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
            <NavLink to="/Login">Already have an account? Login</NavLink>
          </Box>
        </Box>
      </Container>
    </PageLayout>
  );
}

export default SignUp;
