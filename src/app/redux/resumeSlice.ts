import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../apiClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ResumeState {
  pdf_file: {
    name: string;
    size: number;
    type: string;
    lastModified: number;
  } | null;
  jobSeekerData: any;
  isLoading: boolean;
  error: Record<string, any> | null;
  hasUploadedFile: boolean;
  hasCompletedUpload: boolean;
}

const initialState: ResumeState = {
  pdf_file: null,
  jobSeekerData: null,
  isLoading: false,
  error: null,
  hasUploadedFile: false,
  hasCompletedUpload: false,
};

export const uploadResume = createAsyncThunk(
  "resume/uploadResume",
  async (file: File, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("pdf_file", file);

    try {
      const response = await apiClient.post(
        `${API_URL}/api/cv-extraction/upload-pdf/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchJobSeekerData = createAsyncThunk(
  "resume/fetchJobSeekerData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`${API_URL}/api/job-seeker/`);
      console.log("Job seeker data:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createJobSeekerProfile = createAsyncThunk(
  "resume/createJobSeekerProfile",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`${API_URL}/api/job-seeker/`, data);
      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }
      console.log("Job seeker data save:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "resume/updateProfile",
  async (
    {
      id,
      profileData,
      employmentHistory,
    }: { id: number; profileData: any; employmentHistory: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.patch(
        `${API_URL}/api/job-seeker/${id}/`,
        { ...profileData, employment_history: employmentHistory }
      );
      return response.data;
    } catch (error: any) {
      console.error("API error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setFile(
      state,
      action: PayloadAction<{
        name: string;
        size: number;
        type: string;
        lastModified: number;
      } | null>
    ) {
      state.pdf_file = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    setHasUploadedFile(state, action: PayloadAction<boolean>) {
      state.hasUploadedFile = action.payload;
    },
    setHasCompletedUpload(state, action: PayloadAction<boolean>) {
      state.hasCompletedUpload = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadResume.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pdf_file = null;
        state.jobSeekerData = action.payload;
        state.hasUploadedFile = true;
        state.hasCompletedUpload = false;
      })
      .addCase(uploadResume.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as Record<string, any>;
      })
      .addCase(fetchJobSeekerData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobSeekerData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobSeekerData = action.payload;
      })
      .addCase(fetchJobSeekerData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as Record<string, any>;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobSeekerData = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as Record<string, any>;
      });
  },
});

export const { setFile, clearError, setHasUploadedFile, setHasCompletedUpload } = resumeSlice.actions;
export default resumeSlice.reducer;
