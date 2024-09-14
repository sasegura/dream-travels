import { rootSlice } from '@/lib/features/rootSlice';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const preloadedState = {
  travel: {
    travels: [
      {
        id: 1,
        title: 'Trip to Paris',
        photo_url: 'url',
        description: 'A lovely trip to Paris',
      },
      // Agrega más datos según sea necesario
    ],
    randomTravel: {
      id: 1,
      date: new Date().toString(),
      title: 'Trip to Paris',
    },
  },
  search: '',
  randomTrip: {
    date: '',
    id: -1,
    title: '',
  },
  travels: [
    {
      id: 1,
      title: 'Trip to Paris',
      photo_url: 'url',
      description: 'A lovely trip to Paris',
      itinerary: [],
      status: 'done',
    },
    {
      id: 1,
      title: 'Trip to Paris',
      photo_url: 'url',
      description: 'A lovely trip to Paris',
      itinerary: [],
      status: 'done',
    },
  ],
};

export const store = configureStore({
  reducer: rootSlice.reducer,
  preloadedState,
});

export const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
