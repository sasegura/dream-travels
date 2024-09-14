import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { rootSlice } from './features/rootSlice';
import { rootApiSlice } from './features/apiSlice';

const rootReducer = combineSlices(rootApiSlice, rootSlice);
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: {
      root: rootSlice.reducer,
      api: rootApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rootApiSlice.middleware),
  });
};

const store = makeStore();
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch;
// export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
