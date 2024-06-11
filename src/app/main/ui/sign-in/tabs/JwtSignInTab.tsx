import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import _ from "@lodash";
import { AxiosError } from "axios";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import { useAuth } from "src/app/auth/AuthRouteProvider";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showMessage } from "@fuse/core/FuseMessage/store/fuseMessageSlice";
import { useAppDispatch } from "app/store/store";
/**
 * Form Validation Schema
 */
const schema = z.object({
  email: z
    .string()
    .email("You must enter a valid email")
    .nonempty("You must enter an email"),
  password: z
    .string()
    .min(4, "Password is too short - must be at least 4 chars.")
    .nonempty("Please enter your password."),
});

type FormType = {
  email: string;
  password: string;
  remember?: boolean;
};

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function jwtSignInTab() {
  const { jwtService } = useAuth();
  const dispatch = useAppDispatch();
  const { control, formState, handleSubmit, setValue, setError } =
    useForm<FormType>({
      mode: "onChange",
      defaultValues,
      resolver: zodResolver(schema),
    });
  let email = "";
  let password = "";
  history.state["usr"] &&
    history.state["usr"]["email"] &&
    (email = history.state["usr"]["email"]);
  history.state["usr"] &&
    history.state["usr"]["password"] &&
    (password = history.state["usr"]["password"]);
  // try {
  //   email = history.state["usr"]["email"];
  //   password = history.state["usr"]["password"];
  // } catch (error) {
  //   console.log(error);
  // }

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    if (email == "") {
      setValue("email", "admin@fusetheme.com", {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("password", "admin", {
        shouldDirty: true,
        shouldValidate: true,
      });
    } else {
      setValue("email", email, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("password", password, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [setValue]);

  function onSubmit(formData: FormType) {
    const { email, password } = formData;

    jwtService
      .signIn({
        email,
        password,
      })
      .catch(
        (
          error: AxiosError<
            {
              type:
                | "email"
                | "password"
                | "remember"
                | `root.${string}`
                | "root";
              message: string;
            }[]
          >
        ) => {
          const errorData = error.response.data;
          dispatch(
            showMessage({
              message: "You logged in incorrectly!",
              variant: "error",
              autoHideDuration: 3000,
            })
          );
          errorData.forEach((err) => {
            setError(err.type, {
              type: "manual",
              message: err.message,
            });
          });
        }
      );
  }

  return (
    <div className="w-full">
      <form
        name="loginForm"
        noValidate
        className="mt-32 flex w-full flex-col justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-24"
              label="Email"
              autoFocus
              type="email"
              error={!!errors.email}
              helperText={errors?.email?.message}
              variant="outlined"
              required
              fullWidth
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-24"
              label="Password"
              type="password"
              error={!!errors.password}
              helperText={errors?.password?.message}
              variant="outlined"
              required
              fullWidth
            />
          )}
        />

        <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between">
          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <FormControl>
                <FormControlLabel
                  label="Remember me"
                  control={<Checkbox size="small" {...field} />}
                />
              </FormControl>
            )}
          />

          <Link
            className="text-md font-medium"
            to="/pages/auth/forgot-password"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          variant="contained"
          color="secondary"
          className=" mt-16 w-full"
          aria-label="Sign in"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          type="submit"
          size="large"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}

export default jwtSignInTab;
