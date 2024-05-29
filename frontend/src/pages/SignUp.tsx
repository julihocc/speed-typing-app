import PageLayout from "../layouts/PageLayout";
import { NavLink } from "react-router-dom";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import useIndexedStore from "../stores/indexed-store";
import { useNavigate } from "react-router-dom";
import { encrypt } from "../utils/encrypt";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DevTool } from "@hookform/devtools";

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
      avatar: "",
      matchRecords: [],
    };

    addUser(newUser);
    navigate("/Login");
  };

  const onError = (errors: FieldErrors<SignUpInput>) => {
    console.log("Form errors", errors);
  };

  // const emailValidationRules = {
  //   required: "Email is required",
  //   pattern: {
  //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  //     message: "Invalid email address",
  //   },
  //   validate: {
  //     isUnique: async (value: string) => {
  //       const user = await getUserByEmail(value);
  //       return !user || "Email is already in use";
  //     },
  //   },
  // };

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
            {/* <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              {...register("email", {
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
                validate: {
                  isUnique: (value) => {
                    console.log("Checking if email is unique", value);
                    const user = getUserByEmail(value);
                    if (user) {
                      console.error("Email is already in use");
                      return "Email is already in use";
                    }
                    console.log("Email is unique!", user);
                    return true;
                  },
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            /> */}
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
      <DevTool control={control} />
    </PageLayout>
  );
}

export default SignUp;
