import Image from 'next/image';

import { ITravel } from '@/app/interface';
import {
  ButtonTextContainer,
  CardContainer,
  ContentContainer,
  DeleteButtonText,
  Header3,
  ImageContainer,
  BaseButtonText,
  Text1,
  Tag,
} from './style';
import { useState } from 'react';
import { selectRandomTrip } from '@/lib/features/rootSlice';
import Countdown from '../countdown/countDown';
import { useAppSelector } from '@/lib/hooks';

interface Card {
  travel: ITravel;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onDetails: (id: number) => void;
}
export const TravelCard = ({ travel, onDelete, onEdit, onDetails }: Card) => {
  const [imgSrc, setImgSrc] = useState(travel.photo_url ?? '');
  const travelRandom = useAppSelector(selectRandomTrip);

  const handleError = () => {
    setImgSrc(
      'https://a.cdn-hotels.com/gdcs/production82/d1923/447a348f-f875-4885-b00a-e9a90603fef5.jpg'
    );
  };

  return (
    <CardContainer>
      <ImageContainer>
        <Image
          src={imgSrc}
          alt={travel.title}
          layout='fill'
          objectFit='cover'
          style={{ width: '100%', height: '100%' }}
          onError={handleError}
        />
      </ImageContainer>
      <ContentContainer>
        {travel.id === travelRandom?.id &&
          travel.title === travelRandom?.title && (
            <Tag>
              <Countdown
                targetDate={new Date(travelRandom?.date)}
                title={travelRandom?.title}
              />
            </Tag>
          )}
        <Header3>{travel.title}</Header3>
        <Text1>{travel.description}</Text1>

        <ButtonTextContainer>
          <BaseButtonText onClick={() => onDetails(travel?.id)}>
            See trip details
          </BaseButtonText>

          <div>
            <BaseButtonText onClick={() => onEdit(travel?.id)}>
              Edit
            </BaseButtonText>
            <DeleteButtonText onClick={() => onDelete(travel?.id)}>
              Delete
            </DeleteButtonText>
          </div>
        </ButtonTextContainer>
      </ContentContainer>
    </CardContainer>
  );
};
