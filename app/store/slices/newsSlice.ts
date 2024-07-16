import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { News } from '@/app/lib/definitions';

interface NewsState {
  news: News[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  news: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews: (state, action: PayloadAction<News[]>) => {
      state.news = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoadingNews: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setErrorNews: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    }
  },
});

export const { setNews, setLoadingNews, setErrorNews } = newsSlice.actions;
export default newsSlice.reducer;
