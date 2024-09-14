import Image from 'next/image';
import {
  BottonLinkContainer,
  ButtonLink,
  CountdownHeader,
  HeaderWrapper,
  Topbar,
} from './style';
import Countdown from '../countdown/countDown';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  selectRandomTrip,
  selectTravels,
  setDateRandomTrip,
  setTravels,
} from '@/lib/features/rootSlice';

export const Header = ({ openModal }: { openModal: () => void }) => {
  const dispatch = useAppDispatch();
  const randomTravel = useAppSelector(selectRandomTrip);
  const trip = useAppSelector(selectTravels);

  const onCreateRandom = () => {
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 3);
    const travel = trip[Math.floor(Math.random() * trip.length)];

    if (travel) {
      const updatedTrips = trip.map((t) =>
        t.id === travel.id ? { ...t, status: 'todo' } : t
      );

      dispatch(
        setDateRandomTrip({
          date: futureDate.toString(),
          id: travel.id,
          title: travel.title,
        })
      );

      dispatch(setTravels(updatedTrips));
    }
  };

  return (
    <HeaderWrapper>
      <Topbar>
        <Image
          src={'/logo.svg'}
          width={48}
          height={48}
          alt='Portfolio Logo'
        ></Image>
        <BottonLinkContainer>
          {randomTravel?.id && randomTravel?.id != -1 ? (
            <CountdownHeader>
              <Countdown
                targetDate={new Date(randomTravel?.date)}
                title={randomTravel?.title}
              />
            </CountdownHeader>
          ) : (
            <ButtonLink
              onClick={onCreateRandom}
              type='button'
              className='bg-white p-12'
            >
              Create random trip
            </ButtonLink>
          )}

          <ButtonLink
            onClick={openModal}
            type='button'
            className='bg-white p-12'
          >
            Create new trip
          </ButtonLink>
        </BottonLinkContainer>
      </Topbar>
    </HeaderWrapper>
  );
};
