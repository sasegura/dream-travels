import { ITravel } from '@/app/interface';
import { createAppSlice } from '@/lib/createAppSlice';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IRandomTrip {
  date: string;
  id: number;
  title: string;
}

export interface RootSliceState {
  search: string;
  travels: ITravel[];
  randomTrip: IRandomTrip;
}

const initialState: RootSliceState = {
  search: '',
  travels: [],
  randomTrip: {
    date: '',
    id: -1,
    title: '',
  },
};

export const rootSlice = createAppSlice({
  name: 'root',
  initialState,
  reducers: (create) => ({
    setSearchText: create.reducer((state, action: PayloadAction<string>) => {
      state.search = action.payload;
    }),
    setTravels: create.reducer((state, action: PayloadAction<ITravel[]>) => {
      state.travels = action.payload;
    }),
    setDateRandomTrip: create.reducer(
      (state, action: PayloadAction<IRandomTrip>) => {
        state.randomTrip = action.payload;
      }
    ),
  }),
  selectors: {
    selectSearchText: (state) => state.search,
    selectTravels: (state) => state.travels,
    selectRandomTrip: (state) => state.randomTrip,
  },
});

export const { setSearchText } = rootSlice.actions;
export const { setTravels } = rootSlice.actions;
export const { setDateRandomTrip } = rootSlice.actions;

export const { selectSearchText } = rootSlice.selectors;
export const { selectTravels } = rootSlice.selectors;
export const { selectRandomTrip } = rootSlice.selectors;
