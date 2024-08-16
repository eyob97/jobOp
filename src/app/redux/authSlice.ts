import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient, { setAuthToken } from "@/app/apiClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean | null;
  error: string | null;
  user: {
    last_name: string;
    first_name: string;
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    user_type: string;
  } | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
  user: null,
  token: null,
};

interface LoginPayload {
  username: string;
  password: string;
}

interface SignUpPayload {
  first_name: string;
  last_name: string;
  company_name?: string;
  location: string;
  work_email?: string;
  email?: string;
  phone_number: string;
  user_type: string;
  password: string;
  confirm_password: string;
}

interface CompleteSignUpPayload {
  otp: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  password: string;
  confirm_password: string;
}

interface OTPLPayload {
  email?: string;
  phone_number?: string;
  operation_type: string;
}

interface VerifyOTPPayload {
  email?: string;
  otp: string;
  phone_number?: string;
}

interface VerifyCompleteSignUpPayload {
  otp: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  password: string;
  confirm_password: string;
  company_name?: string;
  location?: string;
}

interface UpdateCoverLetterPayload {
  id: number;
  file_name: string;
  file_type: string;
  details: string;
}

export const verifyCompleteSignUp = createAsyncThunk(
  "auth/verifyCompleteSignUp",
  async (payload: VerifyCompleteSignUpPayload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        `${API_URL}/api/user/verify/`,
        payload
      );

      if (response.status !== 200 && response.status !== 201) {
        const errorData = response.data;
        return rejectWithValue(errorData);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`${API_URL}/api/login/`, payload);

      if (response.status !== 200) {
        const errorData = response.data;
        return rejectWithValue(errorData);
      }

      const data = response.data;
      setAuthToken(data.token.access);
      localStorage.setItem("token", data.token.access);
      localStorage.setItem("userId", data.user.id.toString());
      localStorage.setItem("user", JSON.stringify(data.user));

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (payload: SignUpPayload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`${API_URL}/api/users/`, payload);

      if (response.status !== 201) {
        const errorData = response.data;
        return rejectWithValue(errorData);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUser = createAsyncThunk("/api/users/update", async () => {
  try {
  } catch (error) {}
});

export const sendOTP = createAsyncThunk(
  "auth/sendOTP",
  async (payload: OTPLPayload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`${API_URL}/api/otp/`, payload);

      if (response.status !== 200 && response.status !== 201) {
        const errorData = response.data;
        return rejectWithValue(errorData);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (payload: VerifyOTPPayload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`${API_URL}/api/user/verify/`, {
        email: payload.email,
        otp: payload.otp,
      });

      if (response.status !== 200) {
        const errorData = response.data;
        return rejectWithValue(errorData);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const createWhatsapp = createAsyncThunk(
  "auth/createWhatsapp",
  async (payload: SignUpPayload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`${API_URL}/api/signup/whatsapp/`, {
        phone_number: payload.phone_number,
        user_type: payload.user_type,
      });

      if (response.status !== 200) {
        const errorData = response.data;
        return rejectWithValue(errorData);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const completeSignUp = createAsyncThunk(
  "auth/completeSignUp",
  async (payload: CompleteSignUpPayload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        `${API_URL}/api/user/complete/`,
        payload
      );

      if (response.status !== 200) {
        const errorData = response.data;
        return rejectWithValue(errorData);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCoverLetter = createAsyncThunk(
  "letters/updateCoverLetter",
  async (payload: UpdateCoverLetterPayload, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file_name", payload.file_name);
      formData.append("file_type", payload.file_type);
      formData.append("details", payload.details);

      const response = await apiClient.patch(
        `${API_URL}/api/myfiles/${payload.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 200 && response.status !== 201) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loadUserFromLocalStorage = createAsyncThunk(
  "auth/loadUserFromLocalStorage",
  async (_, { dispatch }) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setAuthToken(token);
      dispatch(authSlice.actions.setUser({ user: JSON.parse(user), token }));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
      state.error = null;
      state.token = null;
      setAuthToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },

    setUser(
      state,
      action: PayloadAction<{ user: AuthState["user"]; token: string }>
    ) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token.access;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(sendOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(completeSignUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(completeSignUp.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(completeSignUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createWhatsapp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createWhatsapp.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createWhatsapp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
