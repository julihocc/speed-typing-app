import PageLayout from "../layouts/PageLayout";
import { NavLink } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  ImageList,
  ImageListItem,
  MenuItem,
} from "@mui/material";
import useIndexedStore from "../stores/indexed-store";
import { useNavigate } from "react-router-dom";
import { encrypt } from "../utils/encrypt";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DevTool } from "@hookform/devtools";

import avatars from "../utils/avatars";

const signUpSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    // email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    email: z
      .string()
      .email("Invalid email address")
      .refine(
        (data) => {
          // const user = await getUserByEmail(data);
          console.log("Checking if email is unique", data);
          const user = useIndexedStore.getState().getUserByEmail(data);
          console.log(user ? "Email is already in use" : "Email is unique!");
          return !user;
        },
        { message: "Email is already in use" }
      ),
    avatar: z
      .number()
      .min(1, "Please select an avatar")
      .max(3, "Invalid avatar"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Associate the error with the confirmPassword field
  });

type SignUpInput = z.infer<typeof signUpSchema>;

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
  });

  // const [avatar, setAvatar] = useState("");
  const { addUser, getUserByEmail } = useIndexedStore();
  const navigate = useNavigate();

  //New: Type of parameter changed from React.FormEvent to SignUpInput
  const onSubmit = (data: SignUpInput) => {
    const existingUser = getUserByEmail(data.email);

    if (existingUser) {
      console.error("User already exists");
      return;
    }

    const newUser: IUser = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: encrypt(data.password), // Encrypt password
      avatar: data.avatar,
      matchRecords: [],
    };

    addUser(newUser);
    navigate("/Login");
  };

  const onError = (errors: FieldErrors<SignUpInput>) => {
    console.log("Form errors", errors);
  };

  return (
    <PageLayout title="Sign up">
      <Container maxWidth="xs">
        <Box mt={8} p={3} boxShadow={3}>
          <Typography variant="h5" align="center" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
            <TextField
              label="Firstname"
              fullWidth
              margin="normal"
              {...register("firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
            <TextField
              label="Lastname"
              fullWidth
              margin="normal"
              {...register("lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
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
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
            <ImageList cols={3} sx={{ width: 300, height: 100 }}>
              {avatars.map((avatar, index) => (
                <ImageListItem key={avatar.label}>
                  <img src={avatar.image} alt={`Avatar ${index + 1}`} />
                </ImageListItem>
              ))}
            </ImageList>
            <TextField
              label="Pick an avatar"
              select
              fullWidth
              margin="normal"
              {...register("avatar")}
              error={!!errors.avatar}
              helperText={errors.avatar?.message}
            >
              {avatars.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
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
            <NavLink to="/Login">
              <Typography variant="body2">
                Already have an account? Login
              </Typography>
            </NavLink>
          </Box>
        </Box>
      </Container>

      <DevTool control={control} />
    </PageLayout>
  );
}

export default SignUp;
