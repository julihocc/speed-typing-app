import PageTemplate from "../templates/PageTemplate";
import { Link } from "react-router-dom";

import useIndexedStore from "../stores/indexed-store";
import useSessionStore from "../stores/session-store";
import { encrypt } from "../utils/encrypt";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DevTool } from "@hookform/devtools";
import PasswordError from "../components/PasswordError";

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .refine(
      (email) => {
        console.log("Checking if email is unique", email);
        const user = useIndexedStore.getState().getUserByEmail(email);
        return user;
      },
      { message: "User not found" }
    ),
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
    mode: "onTouched",
  });

  const { getUserByEmail } = useIndexedStore();

  const {
    setCurrentUserEmail,
    setCurrentUserIsAuthenticated,
    passwordError,
    setPasswordError,
  } = useSessionStore();

  const navigate = useNavigate();

  const onSubmit = (data: LoginInput) => {
    console.log(data);
    console.log(`Logging in with ${data.email} and ${data.password}`);
    const user = getUserByEmail(data.email);

    if (!user) {
      console.error("User not found");
      return;
    }

    if (user.password !== encrypt(data.password)) {
      setPasswordError("Password is incorrect");
      return;
    }

    setPasswordError(null);
    setCurrentUserEmail(user.email);
    setCurrentUserIsAuthenticated(user.password === encrypt(data.password));

    return navigate("/Dashboard");
  };

  return (
    <PageTemplate title="Login">
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
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
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
            >
              Login
            </Button>
            {passwordError && <PasswordError />}
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
    </PageTemplate>
  );
}
