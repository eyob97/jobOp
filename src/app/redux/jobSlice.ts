import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../apiClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Job {
  id: number;
  title: string;
  type: string;
  salary: string;
  description: string;
  company: string;
  location: string;
  companyLogo: string;
  postedDate: string;
  expiryDate: string;
}

interface JobState {
  jobs: Job[];
  selectedJob: Job | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: JobState = {
  jobs: [],
  selectedJob: null,
  isLoading: false,
  error: null,
};

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`${API_URL}/api/jobs/`);
      return response.data.map((job: any) => ({
        id: job.id,
        title: job.job_title,
        type: job.employment_type,
        salary: job.min_salary && job.max_salary ? `${job.min_salary} - ${job.max_salary}` : "N/A",
        description: job.description,
        company: job.company, 
        location: job.location,
        companyLogo: "https://lh3.googleusercontent.com/MssYWuI7KeRbQGF6o0f-Bncx5bX6HtzHHE8Kn2reQNGodTU_lQRJsJnCNIflaso0NrsOhzZAEWDuOa9TKSWGgHCxy6gSvQFaQtYo4OY3Uyr_F0TlQpA",
        postedDate: job.created_date,
        expiryDate: job.expiry_date,
      }));
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setSelectedJob(state, action: PayloadAction<number>) {
      state.selectedJob =
        state.jobs.find((job) => job.id === action.payload) || null;
    },
    clearSelectedJob(state) {
      state.selectedJob = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
        state.isLoading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedJob, clearSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;
