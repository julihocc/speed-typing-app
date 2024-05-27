import PageLayout from "../layouts/PageLayout";
import { NavLink } from "react-router-dom";
import useIndexedStore from "../../stores/indexed-store";

import { TextField, Button, Typography, Container, Box } from "@mui/material";

export default function Login() {
  const { email, setEmail, password, setPassword } = useIndexedStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Logging in with ${email} and ${password}`);
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
              // value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              // value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </form>
          <Box mt={2} textAlign="center">
            {/* <Link href="/signup" underline="hover">
              
            </Link> */}
            <NavLink to="/SignUp">Don't have an account? Sign Up</NavLink>
          </Box>
        </Box>
      </Container>
    </PageLayout>
  );
}
