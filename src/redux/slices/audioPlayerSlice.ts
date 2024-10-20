import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AudioPlayerState {
  reciterId: number;
}

const initialState: AudioPlayerState = {
  reciterId: 7, // Default reciter ID
};

const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  initialState,
  reducers: {
    setReciter: (state, action: PayloadAction<number>) => {
      state.reciterId = action.payload;
    },
  },
});

export const { setReciter } = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;
