import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
}

const initialState: JobState = {
  jobs: [
    {
      id: 1,
      title: "Call-center support specialist",
      type: "Full-time",
      salary: "NGN 75,000 - 150,000",
      description: "Lorem ipsum dolor sit amet consectetur.",
      company: "Google Inc.",
      location: "Abuja, Nigeria",
      companyLogo:
        "https://lh3.googleusercontent.com/MssYWuI7KeRbQGF6o0f-Bncx5bX6HtzHHE8Kn2reQNGodTU_lQRJsJnCNIflaso0NrsOhzZAEWDuOa9TKSWGgHCxy6gSvQFaQtYo4OY3Uyr_F0TlQpA",
      postedDate: "2021-06-14",
      expiryDate: "2021-08-14",
    },
    {
      id: 2,
      title: "Part-time Call-center support specialist",
      type: "Part-time",
      salary: "NGN 75,000 - 150,000",
      description: "Lorem ipsum dolor sit amet consectetur.",
      company: "Google Inc.",
      location: "Abuja, Nigeria",
      companyLogo:
        "https://lh3.googleusercontent.com/MssYWuI7KeRbQGF6o0f-Bncx5bX6HtzHHE8Kn2reQNGodTU_lQRJsJnCNIflaso0NrsOhzZAEWDuOa9TKSWGgHCxy6gSvQFaQtYo4OY3Uyr_F0TlQpA",
      postedDate: "2021-06-14",
      expiryDate: "2021-08-14",
    },
    {
      id: 3,
      title: "Call-center support specialist",
      type: "Part-time",
      salary: "NGN 75,000 - 150,000",
      description: "Lorem ipsum dolor sit amet consectetur.",
      company: "Google Inc.",
      location: "Abuja, Nigeria",
      companyLogo:
        "https://lh3.googleusercontent.com/MssYWuI7KeRbQGF6o0f-Bncx5bX6HtzHHE8Kn2reQNGodTU_lQRJsJnCNIflaso0NrsOhzZAEWDuOa9TKSWGgHCxy6gSvQFaQtYo4OY3Uyr_F0TlQpA",
      postedDate: "2021-06-14",
      expiryDate: "2021-08-14",
    },
    {
      id: 4,
      title: "Call-center support specialist",
      type: "Part-time",
      salary: "NGN 75,000 - 150,000",
      description: "Lorem ipsum dolor sit amet consectetur.",
      company: "Google Inc.",
      location: "Abuja, Nigeria",
      companyLogo:
        "https://lh3.googleusercontent.com/MssYWuI7KeRbQGF6o0f-Bncx5bX6HtzHHE8Kn2reQNGodTU_lQRJsJnCNIflaso0NrsOhzZAEWDuOa9TKSWGgHCxy6gSvQFaQtYo4OY3Uyr_F0TlQpA",
      postedDate: "2021-06-14",
      expiryDate: "2021-08-14",
    },
    {
      id: 5,
      title: "Call-center support specialist",
      type: "Full-time",
      salary: "NGN 75,000 - 150,000",
      description: "Lorem ipsum dolor sit amet consectetur.",
      company: "Google Inc.",
      location: "Abuja, Nigeria",
      companyLogo:
        "https://lh3.googleusercontent.com/MssYWuI7KeRbQGF6o0f-Bncx5bX6HtzHHE8Kn2reQNGodTU_lQRJsJnCNIflaso0NrsOhzZAEWDuOa9TKSWGgHCxy6gSvQFaQtYo4OY3Uyr_F0TlQpA",
      postedDate: "2021-06-14",
      expiryDate: "2021-08-14",
    },
    {
      id: 6,
      title: "Test Call-center support specialist",
      type: "Full-time",
      salary: "NGN 75,000 - 150,000",
      description: "Lorem ipsum dolor sit amet consectetur.",
      company: "Google Inc.",
      location: "Abuja, Nigeria",
      companyLogo:
        "https://lh3.googleusercontent.com/MssYWuI7KeRbQGF6o0f-Bncx5bX6HtzHHE8Kn2reQNGodTU_lQRJsJnCNIflaso0NrsOhzZAEWDuOa9TKSWGgHCxy6gSvQFaQtYo4OY3Uyr_F0TlQpA",
      postedDate: "2021-06-14",
      expiryDate: "2021-08-14",
    },
  ],
  selectedJob: null,
};

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
});

export const { setSelectedJob, clearSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;
