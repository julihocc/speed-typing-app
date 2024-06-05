import PageTemplate from "../layouts/PageLayout";
import { Link } from "react-router-dom";

import useIndexedStore from "../stores/indexed-store";
import useSessionStore from "../stores/session-store";
import { encrypt } from "../utils/encrypt";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DevTool } from "@hookform/devtools";
import PasswordError from "../components/PasswordError";
import { Button } from "@mui/material";

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

    // if (!user) {
    //   console.error("User not found");
    //   return;
    // }

    // if (user.password !== encrypt(data.password)) {
    //   setPasswordError("Password is incorrect");
    //   return;
    // }

    if (!user || user.password !== encrypt(data.password)) {
      setPasswordError("User or password are incorrect");
      return;
    }

    setPasswordError(null);
    setCurrentUserEmail(user.email);
    setCurrentUserIsAuthenticated(user.password === encrypt(data.password));

    return navigate("/Dashboard");
  };

  return (
    <PageTemplate title="Login">
      <div className="flex flex-col items-center w-96">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 flex flex-col items-center w-96"
        >
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
          <Button type="submit" >
            <div className="text-primary border-2 border-primary hover:bg-primary hover:text-white p-2 rounded-md cursor-pointer flex justify-center items-center mt-4 ">
              Login
            </div>
          </Button>
          {passwordError && <PasswordError />}
        </form>
        <div className="flex justify-center items-center mt-4">
          <Link to="/SignUp">
            <div className="text-primary hover:underline font-mono">
              Don't have an account? Sign up
            </div>
          </Link>
        </div>
      </div>

      <DevTool control={control} />
    </PageTemplate>
  );
}
