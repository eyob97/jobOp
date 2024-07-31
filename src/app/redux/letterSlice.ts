import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../apiClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface CoverLetterState {
  data: Record<string, any> | null;
  generatedCoverLetter: string;
  files: Array<Record<string, any>>;
  isLoading: boolean;
  error: string | null;
}

const initialState: CoverLetterState = {
  data: null,
  generatedCoverLetter: "",
  files: [],
  isLoading: false,
  error: null,
};

export const fetchFiles = createAsyncThunk(
  "coverLetter/fetchFiles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`${API_URL}/api/myfiles/`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const generateCoverLetterAPI = createAsyncThunk(
  "coverLetter/generateCoverLetterAPI",
  async (formData: Record<string, any>, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`${API_URL}/api/cover-letter/`, formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const saveAndApplyAPI = createAsyncThunk(
  "coverLetter/saveAndApplyAPI",
  async ({ id, formData }: { id: string, formData: Record<string, any> }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(`${API_URL}/api/myfiles/${id}/`, formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const coverLetterSlice = createSlice({
  name: "coverLetter",
  initialState,
  reducers: {
    clearCoverLetter(state) {
      state.data = null;
      state.generatedCoverLetter = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFiles.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.files = action.payload;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(generateCoverLetterAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generateCoverLetterAPI.fulfilled, (state, action: PayloadAction<{ cover_letter: string }>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.generatedCoverLetter = action.payload.cover_letter;
      })
      .addCase(generateCoverLetterAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(saveAndApplyAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveAndApplyAPI.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      })
      .addCase(saveAndApplyAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCoverLetter } = coverLetterSlice.actions;
export default coverLetterSlice.reducer;
