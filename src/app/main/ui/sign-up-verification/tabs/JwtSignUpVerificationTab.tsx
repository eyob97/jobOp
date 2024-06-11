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
import {
  SignUpVerificationPayload,
  useAuth,
} from "../../../../auth/AuthRouteProvider";
import { useNavigate } from "react-router-dom";
import { showMessage } from "@fuse/core/FuseMessage/store/fuseMessageSlice";
import { useAppDispatch } from "app/store/store";

/**
 * Form Validation Schema
 */
const schema = z.object({
  code: z.string().nonempty("You must enter a code"),
});

const defaultValues = {
  code: "",
};

function JwtSignUpVerificationTab() {
  const { jwtService } = useAuth();
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { control, formState, handleSubmit, setError } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit(formData: SignUpVerificationPayload) {
    const { code } = formData;
    let email = "";
    let displayName = "";
    let password = "";
    let company = "";
    try {
      email = history.state["usr"]["email"];
      displayName = history.state["usr"]["displayName"];
      password = history.state["usr"]["password"];
      company = history.state["usr"]["company"];
    } catch (error) {
      console.log(error);
    }
    jwtService
      .signUpVerification({
        code,
        email,
        displayName,
        password,
        company,
      })
      .then((response) => {
        // No need to do anything, registered user data will be set at app/auth/AuthRouteProvider
        dispatch(
          showMessage({
            message: "Code verification successful!",
            variant: "info",
            autoHideDuration: 3000,
          })
        );
        if (response["data"]["result"])
          navigate("/ui/sign-in", {
            state: { email: email, password: password },
          });
        else navigate("/ui/sign-up");
      })
      .catch((e) => {
        console.log("verification error! ", e);
        dispatch(
          showMessage({
            message: "code validation failed!",
            variant: "error",
            autoHideDuration: 3000,
          })
        );
      });
  }
  return (
    <form
      name="registerForm"
      noValidate
      className="mt-32 flex w-full flex-col justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="code"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mb-24"
            label="Verification code"
            autoFocus
            type="name"
            error={!!errors.code}
            helperText={errors?.code?.message}
            variant="outlined"
            required
            fullWidth
          />
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
        Verify
      </Button>
    </form>
  );
}

export default JwtSignUpVerificationTab;
