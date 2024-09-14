'use client';
import { useEffect, useState } from 'react';
import { Header1 } from '@/app/style';

import Image from 'next/image';

import { Header3, Text1 } from '@/components/travelCard/style';
import { ITravel, IItinerary } from '@/app/interface';
import {
  ButtonCheck,
  CloseButton,
  ContentText,
  ImageContainer,
  LightText,
  ModalContent,
  Separator,
  TimelineContainer,
  TimelineItem,
  TimelinePoint,
} from './style';
import { useMarckAsCompletedTravelByIdMutation } from '@/lib/features/apiSlice';

import { CustomModal } from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectTravels, setTravels } from '@/lib/features/rootSlice';
import { updatedTravels } from '@/utils/travel';

const emptyTravel = {
  title: '',
  description: '',
  id: 0,
  photo_url: '',
  itinerary: [],
  status: '',
};

interface ITravelModal {
  id: number;
  isOpen: boolean;
  onCancel: () => void;
}

const defaultImage =
  'https://a.cdn-hotels.com/gdcs/production82/d1923/447a348f-f875-4885-b00a-e9a90603fef5.jpg';
export default function TravelDetailModal({
  id,
  isOpen,
  onCancel,
}: ITravelModal) {
  const [travel, setTravel] = useState<ITravel>(emptyTravel);
  const [imgSrc, setImgSrc] = useState(travel.photo_url ?? '');

  const travels = useSelector(selectTravels);
  const dispatch = useDispatch();

  const handleError = () => {
    setImgSrc(defaultImage);
  };

  const [
    marckAsCompleted,
    {
      data: updatedTravel,
      isLoading: isLoadingUpdateTravel,
      error: errorUpdateTravel,
    },
  ] = useMarckAsCompletedTravelByIdMutation();

  useEffect(() => {
    if (id) {
      const findTravel = travels.find((t) => t.id === id);
      if (findTravel) {
        setTravel(findTravel);
        setImgSrc(findTravel.photo_url ?? '');
      }
    }
  }, [id, travels]);

  useEffect(() => {
    if (!isLoadingUpdateTravel) {
      let updatedTreavels;
      if (updatedTravel) {
        setTravel(updatedTravel);
        updatedTreavels = updatedTravels(travels, updatedTravel);
        dispatch(setTravels(updatedTreavels));
      } else {
        if (
          errorUpdateTravel &&
          'status' in errorUpdateTravel &&
          errorUpdateTravel?.status === 404
        ) {
          const newTravel = {
            ...travel,
            status: travel.status === 'done' ? 'todo' : 'done',
          };
          setTravel(newTravel);
          updatedTreavels = updatedTravels(travels, newTravel);
          dispatch(setTravels(updatedTreavels));
        }
      }
    }
  }, [updatedTravel, isLoadingUpdateTravel]);

  const handleCompleted = () => {
    marckAsCompleted({
      travelId: id,
      status: travel?.status === 'todo' ? 'done' : 'todo',
    });
  };

  return (
    <>
      <CustomModal isOpen={isOpen} onCancel={onCancel}>
        <>
          <ModalContent>
            <ImageContainer>
              {imgSrc ? (
                <Image
                  src={imgSrc}
                  alt={travel.title}
                  layout='fill'
                  onError={handleError}
                />
              ) : (
                <Image src={defaultImage} alt={travel.title} layout='fill' />
              )}
              <CloseButton onClick={onCancel}>×</CloseButton>
            </ImageContainer>
            <ContentText>
              <Header1>{travel.title}</Header1>
              <ButtonCheck onClick={handleCompleted}>
                <Image
                  src={
                    travel?.status === 'done'
                      ? '/checked.svg'
                      : '/unchecked.svg'
                  }
                  alt='Status check'
                  width={24}
                  height={24}
                />
                <span>
                  {`${travel?.status !== 'done' ? 'Mark as ' : ''}Completed`}{' '}
                </span>
              </ButtonCheck>

              <Text1>{travel.description}</Text1>
              <Separator />
              <Header3> Itinerary</Header3>
              {travel?.itinerary && (
                <TimelineContainer>
                  {travel.itinerary.map((itinerary: IItinerary) => (
                    <TimelineItem key={itinerary.day}>
                      <TimelinePoint />
                      <span>{`Day ${itinerary.day}: ${itinerary.location}`}</span>
                      <LightText>{itinerary.description}</LightText>
                    </TimelineItem>
                  ))}
                </TimelineContainer>
              )}
            </ContentText>
          </ModalContent>
        </>
      </CustomModal>
    </>
  );
}
