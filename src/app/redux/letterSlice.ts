import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../apiClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface CoverLetterFormData {
  full_name: string;
  contact_info: string;
  recipient_name: string;
  company_name: string;
  interest_reason: string;
  relevant_experience: string;
  top_skills: string[];
  major_accomplishment: string;
  relevant_project: string;
  unique_qualities: string;
}

interface MotivationLetterFormData {
  name: string;
  current_job_title: string;
  position_applied_for: string;
  job_attract_aspects: string;
  specific_skills: string;
  unique_skills: string;
  company_mission_and_values: string;
  long_term_career_aspirations: string;
  availability_start_date: string;
}

interface CoverLetterState {
  data: CoverLetterFormData | null;
  generatedCoverLetter: { id: number; cover_letter: string } | null;
  editableContent: string;
  files: Array<Record<string, any>>;
  isLoading: boolean;
  error: string | null;
}

interface MotivationLetterState {
  data: MotivationLetterFormData | null;
  generatedMotivationLetter: { id: number; motivation_letter: string } | null;
  editableContent: string;
  files: Array<Record<string, any>>;
  isLoading: boolean;
  error: string | null;
}

interface LettersState {
  coverLetter: CoverLetterState;
  motivationLetter: MotivationLetterState;
}

const initialState: LettersState = {
  coverLetter: {
    data: null,
    generatedCoverLetter: null,
    files: [],
    isLoading: false,
    error: null,
    editableContent: "",
  },
  motivationLetter: {
    data: null,
    generatedMotivationLetter: null,
    files: [],
    isLoading: false,
    error: null,
    editableContent: "",
  },
};

export const fetchFiles = createAsyncThunk(
  "letters/fetchFiles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`${API_URL}/api/myfiles/`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteFile = createAsyncThunk(
  "letters/deleteFile",
  async (fileId: number, { rejectWithValue }) => {
    try {
      await apiClient.delete(`${API_URL}/api/myfiles/${fileId}/`);
      return fileId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const generateCoverLetterAPI = createAsyncThunk(
  "letters/generateCoverLetterAPI",
  async (formData: CoverLetterFormData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        `${API_URL}/api/cover-letter/`,
        formData
      );
      return {
        ...formData,
        id: response.data.id,
        cover_letter: response.data.cover_letter,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const generateMotivationLetterAPI = createAsyncThunk(
  "letters/generateMotivationLetterAPI",
  async (formData: MotivationLetterFormData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        `${API_URL}/api/motivation-letter/`,
        formData
      );
      return {
        ...formData,
        id: response.data.id,
        motivation_letter: response.data.cover_letter,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const saveAndApplyAPI = createAsyncThunk(
  "letters/saveAndApplyAPI",
  async ({ id, formData }: { id: number; formData: FormData }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(`${API_URL}/api/myfiles/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const letterSlice = createSlice({
  name: "letters",
  initialState,
  reducers: {
    clearCoverLetter(state) {
      state.coverLetter.data = null;
      state.coverLetter.generatedCoverLetter = null;
      state.coverLetter.editableContent = ""; 
    },
    clearMotivationLetter(state) {
      state.motivationLetter.data = null;
      state.motivationLetter.generatedMotivationLetter = null;
      state.motivationLetter.editableContent = ""; 
    },
    setEditableContent(state, action: PayloadAction<string>) {
      state.coverLetter.editableContent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchFiles.pending, (state) => {
      state.coverLetter.isLoading = true;
      state.coverLetter.error = null;
      state.motivationLetter.isLoading = true; 
      state.motivationLetter.error = null; 
    })
    .addCase(fetchFiles.fulfilled, (state, action: PayloadAction<any[]>) => {
      state.coverLetter.isLoading = false;
      state.coverLetter.files = action.payload;
      state.motivationLetter.isLoading = false; 
      state.motivationLetter.files = action.payload; 
    })
    .addCase(fetchFiles.rejected, (state, action) => {
      state.coverLetter.isLoading = false;
      state.coverLetter.error = action.payload as string;
      state.motivationLetter.isLoading = false;
      state.motivationLetter.error = action.payload as string; 
    })

      .addCase(deleteFile.pending, (state) => {
        state.coverLetter.isLoading = true;
        state.coverLetter.error = null;
      })
      .addCase(deleteFile.fulfilled, (state, action: PayloadAction<number>) => {
        state.coverLetter.isLoading = false;
        state.coverLetter.files = state.coverLetter.files.filter(file => file.id !== action.payload);
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.coverLetter.isLoading = false;
        state.coverLetter.error = action.payload as string;
      })
      .addCase(generateCoverLetterAPI.pending, (state) => {
        state.coverLetter.isLoading = true;
        state.coverLetter.error = null;
      })
      .addCase(
        generateCoverLetterAPI.fulfilled,
        (state, action: PayloadAction<CoverLetterFormData & { id: number; cover_letter: string }>) => {
          state.coverLetter.isLoading = false;
          state.coverLetter.data = action.payload;
          state.coverLetter.generatedCoverLetter = { id: action.payload.id, cover_letter: action.payload.cover_letter };
        }
      )
      .addCase(generateCoverLetterAPI.rejected, (state, action) => {
        state.coverLetter.isLoading = false;
        state.coverLetter.error = action.payload as string;
      })
      .addCase(generateMotivationLetterAPI.pending, (state) => {
        state.motivationLetter.isLoading = true;
        state.motivationLetter.error = null;
      })
      .addCase(
        generateMotivationLetterAPI.fulfilled,
        (state, action: PayloadAction<MotivationLetterFormData & { id: number; motivation_letter: string }>) => {
          state.motivationLetter.isLoading = false;
          state.motivationLetter.data = action.payload;
          state.motivationLetter.generatedMotivationLetter =
            { id: action.payload.id, motivation_letter: action.payload.motivation_letter };
        }
      )
      .addCase(generateMotivationLetterAPI.rejected, (state, action) => {
        state.motivationLetter.isLoading = false;
        state.motivationLetter.error = action.payload as string;
      })
      .addCase(saveAndApplyAPI.pending, (state) => {
        state.coverLetter.isLoading = true;
        state.coverLetter.error = null;
        state.motivationLetter.isLoading = true;
        state.motivationLetter.error = null;
      })
      .addCase(saveAndApplyAPI.fulfilled, (state, action) => {
        state.coverLetter.isLoading = false;
        state.coverLetter.generatedCoverLetter = action.payload; 
        state.motivationLetter.isLoading = false;
        state.motivationLetter.generatedMotivationLetter = action.payload;
      })
      .addCase(saveAndApplyAPI.rejected, (state, action) => {
        state.coverLetter.isLoading = false;
        state.coverLetter.error = action.payload as string;
        state.motivationLetter.isLoading = false;
        state.motivationLetter.error = action.payload as string;
      });
  },
});

export const { clearCoverLetter, clearMotivationLetter, setEditableContent } = letterSlice.actions;
export default letterSlice.reducer;
