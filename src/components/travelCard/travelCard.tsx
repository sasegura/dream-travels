import { useState } from 'react';
import Image from 'next/image';

import { ITravel } from '@/app/interface';
import { selectRandomTrip } from '@/lib/features/rootSlice';
import { useAppSelector } from '@/lib/hooks';
import Countdown from '@/components/countdown/countDown';
import { defaultImage } from '@/utils/const';
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
    setImgSrc(defaultImage);
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
