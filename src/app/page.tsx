'use client';
import { useEffect, useState } from 'react';
import { NextUIProvider } from '@nextui-org/system';

import { TravelCard } from '@/components/travelCard/travelCard';
import styles from './page.module.css';
import { SearchInput } from '@/components/search/search';
import {
  useCreateTravelMutation,
  useDeleteTravelByIdMutation,
  useGetTravelsQuery,
  useUpdateTravelMutation,
} from '@/lib/features/apiSlice';
import {
  selectSearchText,
  selectTravels,
  setDateRandomTrip,
  setTravels,
} from '@/lib/features/rootSlice';
import { ConfirmationModal } from '@/components/modal/confirmationModal/confirmationModal';
import TravelDetailModal from '@/components/modal/travelDetailModal/travelDetailModal';
import { FilterTrip, ITravel } from './interface';
import { Header } from '@/components/header/header';
import Loading from '@/components/loading/loading';
import { filterTravels, updatedTravels } from '@/utils/travel';
import TripModal from '@/components/modal/tripModal/tripModal';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { H1, MainPage, Subtitle, Travels } from './style';
import { Tabs } from '@/components/tabs/tabs';

export default function Home() {
  const [filteredTravels, setFilteredTravels] = useState<ITravel[]>([]);
  const [selectedButton, setSelectedButton] = useState<FilterTrip>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditTravelModalOpen, setIsEditTravelModalOpen] = useState(false);
  const [selectedTravel, setSelectedTravel] = useState<number>(0);

  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearchText);
  const travels = useAppSelector(selectTravels);

  const {
    data: getTravelsData,
    isFetching,
    isSuccess: isSuccessGetTravel,
  } = useGetTravelsQuery();

  useEffect(() => {
    if (getTravelsData && !isFetching && isSuccessGetTravel) {
      dispatch(setTravels(getTravelsData));
    }
  }, [getTravelsData, isFetching, isSuccessGetTravel]);

  useEffect(() => {
    setFilteredTravels(filterTravels(travels, selectedButton, search));
  }, [selectedButton, travels, search]);

  const [deleteTravelById, { originalArgs, isLoading: isSuccessDeleting }] =
    useDeleteTravelByIdMutation();

  useEffect(() => {
    if (!isSuccessDeleting && originalArgs?.travelId) {
      const newTravel = travels.filter(
        (travel) => travel.id !== originalArgs.travelId
      );
      if (travels.length !== newTravel.length) {
        dispatch(setTravels(newTravel));
      }
    }
  }, [isSuccessDeleting, originalArgs, travels]);

  const OnDelete = (id: number) => {
    setSelectedTravel(id);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    dispatch(
      setDateRandomTrip({
        title: '',
        id: -1,
        date: '',
      })
    );
    selectedTravel && deleteTravelById({ travelId: selectedTravel });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onDetails = (id: number) => {
    setSelectedTravel(id);
    setIsDetailModalOpen(true);
  };

  const OnEdit = (id: number = 0) => {
    setSelectedTravel(id);
    setIsEditTravelModalOpen(true);
  };

  const handleCloseTripModal = () => {
    setIsEditTravelModalOpen(false);
    setSelectedTravel(0);
  };

  const [createTravel, { data: dataCreate, isSuccess: isSuccessCreate }] =
    useCreateTravelMutation();

  const onCreateTravel = (travel: Omit<ITravel, 'id'>) => {
    createTravel({ travel: travel });
    handleCloseTripModal();
  };

  useEffect(() => {
    if (isSuccessCreate) {
      const updatedTravels = [...travels];
      const newTravel = dataCreate.travel as ITravel;
      updatedTravels.push({
        ...newTravel,
        id: dataCreate.id,
      });

      dispatch(setTravels(updatedTravels));
    }
  }, [isSuccessCreate]);

  const [
    updateTravel,
    { originalArgs: originalArgsUpdate, isLoading: isLoadingUpdate },
  ] = useUpdateTravelMutation();

  const onEditTravel = (travel: ITravel) => {
    updateTravel({ travelId: selectedTravel, travel: travel });
    handleCloseTripModal();
  };

  useEffect(() => {
    if (!isLoadingUpdate && originalArgsUpdate) {
      const updatedTreavels = updatedTravels(
        travels,
        originalArgsUpdate.travel
      );

      dispatch(setTravels(updatedTreavels));
      setSelectedTravel(0);
    }
  }, [isLoadingUpdate, originalArgsUpdate]);

  return (
    <NextUIProvider>
      <div className={styles.page}>
        <Header openModal={() => OnEdit(0)} />
        {isFetching ? (
          <Loading />
        ) : (
          <MainPage>
            <H1>The places you dream of</H1>
            <Subtitle>Let’s live new adventures</Subtitle>
            <SearchInput defaultValue={''}></SearchInput>
            <Tabs
              selectedButton={selectedButton}
              setSelectedButton={setSelectedButton}
            />
            <Travels>
              {filteredTravels &&
                filteredTravels.map((travel: ITravel) => (
                  <TravelCard
                    key={`${travel.id}${travel.title}`}
                    travel={travel}
                    onDelete={OnDelete}
                    onDetails={onDetails}
                    onEdit={OnEdit}
                  />
                ))}
            </Travels>
          </MainPage>
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      <TravelDetailModal
        id={selectedTravel}
        isOpen={isDetailModalOpen}
        onCancel={() => {
          setSelectedTravel(0);
          setIsDetailModalOpen(false);
        }}
      />

      <TripModal
        id={selectedTravel}
        isOpen={isEditTravelModalOpen}
        onCancel={handleCloseTripModal}
        createTravel={onCreateTravel}
        editTravel={onEditTravel}
      />
    </NextUIProvider>
  );
}
