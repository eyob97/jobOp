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

interface Applicant {
  id: number;
  job: {
    job_title: string;
  };
  created_date: string;
  status: string;
}

interface JobState {
  jobs: Job[];
  selectedJob: Job | null;
  isLoading: boolean;
  error: string | null;
  applicants: Applicant[];
}

const initialState: JobState = {
  jobs: [],
  selectedJob: null,
  isLoading: false,
  error: null,
  applicants: [],
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
        salary:
          job.min_salary && job.max_salary
            ? `${job.min_salary} - ${job.max_salary}`
            : "N/A",
        description: job.description,
        company: job.company,
        location: job.location,
        companyLogo:
          "https://lh3.googleusercontent.com/MssYWuI7KeRbQGF6o0f-Bncx5bX6HtzHHE8Kn2reQNGodTU_lQRJsJnCNIflaso0NrsOhzZAEWDuOa9TKSWGgHCxy6gSvQFaQtYo4OY3Uyr_F0TlQpA",
        postedDate: job.created_date,
        expiryDate: job.expiry_date,
        is_applied: job?.is_applied,
      }));
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchEmployerCompany = createAsyncThunk(
  "/api/company",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`${API_URL}/api/company`);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchEmployerJobs = createAsyncThunk(
  "/api/jobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`${API_URL}/api/jobs`);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const applyForJob = createAsyncThunk(
  "jobs/applyForJob",
  async (
    applicationData: {
      job: number;
      resume: number;
      cover_letter?: number;
      motivation_letter?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post(
        `${API_URL}/api/applicants/`,
        applicationData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchApplicants = createAsyncThunk(
  "jobs/fetchApplicants",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`${API_URL}/api/applicants/`);
      return response.data;
    } catch (error: any) {
      let errorMessage = "An unknown error occurred";

      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = "Bad request. Please check the submitted data.";
            break;
          case 401:
            errorMessage = "Unauthorized. Please log in and try again.";
            break;
          default:
            errorMessage = "Applicants not found. Please try again later.";
            break;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const createJobPost = createAsyncThunk(
  "jobs/createJobPost",
  async (jobData: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`${API_URL}/api/jobs/`, jobData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getSkills = createAsyncThunk(
  "jobs/skills",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`${API_URL}/api/skills/`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateApplicantStatus = createAsyncThunk(
  "applicants/updateApplicantStatus",
  async (
    { applicantId, status }: { applicantId: number; status: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.patch(
        `${API_URL}/api/applicants/${applicantId}/`,
        {
          status,
        }
      );
      return response.data;
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
      })
      .addCase(applyForJob.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(applyForJob.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(applyForJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchApplicants.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchApplicants.fulfilled,
        (state, action: PayloadAction<Applicant[]>) => {
          state.isLoading = false;
          state.applicants = action.payload;
        }
      )
      .addCase(fetchApplicants.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createJobPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createJobPost.fulfilled, (state, action: PayloadAction<Job>) => {
        state.isLoading = false;
        state.jobs.push(action.payload);
      })
      .addCase(createJobPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateApplicantStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        updateApplicantStatus.fulfilled,
        (state, action: PayloadAction<Applicant>) => {
          state.isLoading = false;
          const index = state.applicants.findIndex(
            (applicant) => applicant.id === action.payload.id
          );
          if (index !== -1) {
            state.applicants[index] = action.payload;
          }
        }
      )
      .addCase(updateApplicantStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedJob, clearSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;
