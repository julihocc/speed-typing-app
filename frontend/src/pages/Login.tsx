import PageLayout from "../layouts/PageLayout";
import { Link } from "react-router-dom";
// import { useState } from "react";
// import useIndexedStore from "../../stores/indexed-store";
import useIndexedStore from "../stores/indexed-store";
import useSessionStore from "../stores/session-store";
import { encrypt } from "../utils/encrypt";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DevTool } from "@hookform/devtools";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginInput = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  // const [capturedEmail, setCapturedEmail] = useState("");
  // const [capturedPassword, setCapturedPassword] = useState("");
  const { getUserByEmail } = useIndexedStore();
  const { setCurrentUserEmail, setCurrentUserIsAuthenticated } =
    useSessionStore();
  const navigate = useNavigate();

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log(`Logging in with ${capturedEmail} and ${capturedEmail}`);
  //   const user = getUserByEmail(capturedEmail);
  //   console.log("Current user", user);
  //   if (!user) {
  //     console.error("User not found");
  //     return;
  //   }
  //   if (user.password !== encrypt(capturedPassword)) {
  //     console.error("Invalid password");
  //     return;
  //   }
  //   setCurrentUserEmail(user.email);
  //   setCurrentUserIsAuthenticated(user.password === encrypt(capturedPassword));
  //   setCapturedEmail("");
  //   setCapturedPassword("");

  //   return navigate("/Dashboard");
  // };

  const onSubmit = (data: LoginInput) => {
    console.log(data);
    console.log(`Logging in with ${data.email} and ${data.password}`);
    const user = getUserByEmail(data.email);
    console.log("Current user", user);
    if (!user) {
      console.error("User not found");
      return;
    }
    if (user.password !== encrypt(data.password)) {
      console.error("Invalid password");
      return;
    }
    setCurrentUserEmail(user.email);
    setCurrentUserIsAuthenticated(user.password === encrypt(data.password));
    // setCapturedEmail("");
    // setCapturedPassword("");

    return navigate("/Dashboard");
  };

  return (
    <PageLayout title="Login">
      <Container maxWidth="xs">
        <Box mt={8} p={3} boxShadow={3}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              // value={capturedEmail}
              // onChange={(e) => setCapturedEmail(e.target.value)}
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              // value={capturedPassword}
              // onChange={(e) => setCapturedPassword(e.target.value)}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              // onClick={handleSubmit}
            >
              Login
            </Button>
          </form>
          <Box mt={2} textAlign="center">
            <Link to="/SignUp">
              <Typography variant="body2">
                Don't have an account? Sign up
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
      <DevTool control={control} />
    </PageLayout>
  );
}
