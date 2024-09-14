import { ITravel } from '@/app/interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rootApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://my-json-server.typicode.com/mariosanz92/dream-travels-data/travels',
  }),
  reducerPath: 'api',
  tagTypes: ['Trips'],
  endpoints: (build) => ({
    getTravels: build.query<ITravel[], void>({
      query: () => {
        return {
          url: '/',
          method: 'GET',
        };
      },
      providesTags: ['Trips'],
    }),
    getTravelById: build.query<ITravel, { travelId: number }>({
      query: ({ travelId }: { travelId: number }) => {
        return {
          url: `/${travelId}`,
          method: 'GET',
        };
      },
    }),
    deleteTravelById: build.mutation<ITravel, { travelId: number }>({
      query: ({ travelId }: { travelId: number }) => {
        return {
          url: `/${travelId}`,
          method: 'DELETE',
        };
      },
    }),
    marckAsCompletedTravelById: build.mutation<
      ITravel,
      { travelId: number; status: string }
    >({
      query: ({ travelId, status }: { travelId: number; status: string }) => {
        return {
          url: `/${travelId}`,
          method: 'PATCH',
          body: { status },
        };
      },
    }),
    createTravel: build.mutation<
      { travel: ITravel; id: number },
      { travel: Omit<ITravel, 'id'> }
    >({
      query: ({ travel }: { travel: Omit<ITravel, 'id'> }) => {
        return {
          url: `/`,
          method: 'POST',
          body: { travel },
        };
      },
    }),
    updateTravel: build.mutation<
      { travel: ITravel; id: number },
      { travelId: number; travel: ITravel }
    >({
      query: ({ travelId, travel }: { travelId: number; travel: ITravel }) => {
        return {
          url: `/${travelId}`,
          method: 'PUT',
          body: { travel },
        };
      },
    }),
  }),
});

export const {
  useGetTravelsQuery,
  useLazyGetTravelByIdQuery,
  useDeleteTravelByIdMutation,
  useMarckAsCompletedTravelByIdMutation,
  useCreateTravelMutation,
  useUpdateTravelMutation,
} = rootApiSlice;
