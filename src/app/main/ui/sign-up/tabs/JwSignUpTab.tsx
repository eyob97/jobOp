import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import _ from "@lodash";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SignUpPayload, useAuth } from "../../../../auth/AuthRouteProvider";
import React from "react";
import { useNavigate } from "react-router-dom";
import { showMessage } from "@fuse/core/FuseMessage/store/fuseMessageSlice";
import { useAppDispatch } from "app/store/store";

/**
 * Form Validation Schema
 */
const schema = z
  .object({
    displayName: z.string().nonempty("You must enter your name"),
    email: z
      .string()
      .email("You must enter a valid email")
      .nonempty("You must enter an email"),
    company: z.string().min(1, "You must enter a company"),
    password: z
      .string()
      .min(8, "Password is too short - should be 8 chars minimum."),
    passwordConfirm: z.string().nonempty("Password confirmation is required"),
    acceptTermsConditions: z
      .boolean()
      .refine(
        (val) => val === true,
        "The terms and conditions must be accepted."
      ),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"],
  });

const defaultValues = {
  displayName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  company: "",
  acceptTermsConditions: false,
};

function JwtSignUpTab() {
  const { jwtService } = useAuth();
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { control, formState, handleSubmit, setError } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit(formData: SignUpPayload) {
    const { displayName, email, password, company } = formData;
    jwtService
      .signUp({
        displayName,
        password,
        email,
        company,
      })
      .then(() => {
        // No need to do anything, registered user data will be set at app/auth/AuthRouteProvider
        dispatch(
          showMessage({
            message: "Check your email!",
            variant: "info",
            autoHideDuration: 3000,
          })
        );
        navigate("/ui/sign-up-verification", {
          state: {
            email: email,
            displayName: displayName,
            password: password,
            company: company,
          },
        });
        // window.location.replace(
        //   window.location.origin + "/ui/sign-up-verification"
        // );
      })
      .catch(
        (
          _errors: {
            type: "email" | "password" | `root.${string}` | "root";
            message: string;
          }[]
        ) => {
          dispatch(
            showMessage({
              message: "Something went wrong!",
              variant: "error",
              autoHideDuration: 3000,
            })
          );
          _errors.forEach(({ message, type }) => {
            setError(type, { type: "manual", message });
          });
        }
      );
  }

  return (
    <form
      name="registerForm"
      noValidate
      className="mt-32 flex w-full flex-col justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="displayName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mb-24"
            label="Display name"
            autoFocus
            type="name"
            error={!!errors.displayName}
            helperText={errors?.displayName?.message}
            variant="outlined"
            required
            fullWidth
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mb-24"
            label="Email"
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
        name="company"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mb-24"
            label="Company"
            type="text"
            error={!!errors.company}
            helperText={errors?.company?.message}
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

      <Controller
        name="passwordConfirm"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mb-24"
            label="Password (Confirm)"
            type="password"
            error={!!errors.passwordConfirm}
            helperText={errors?.passwordConfirm?.message}
            variant="outlined"
            required
            fullWidth
          />
        )}
      />

      <Controller
        name="acceptTermsConditions"
        control={control}
        render={({ field }) => (
          <FormControl
            className="items-center"
            error={!!errors.acceptTermsConditions}
          >
            <FormControlLabel
              label="I agree to the Terms of Service and Privacy Policy"
              control={<Checkbox size="small" {...field} />}
            />
            <FormHelperText>
              {errors?.acceptTermsConditions?.message}
            </FormHelperText>
          </FormControl>
        )}
      />

      <Button
        variant="contained"
        color="secondary"
        className="mt-24 w-full"
        aria-label="Register"
        disabled={_.isEmpty(dirtyFields) || !isValid}
        type="submit"
        size="large"
      >
        Create your free account
      </Button>
    </form>
  );
}

export default JwtSignUpTab;
