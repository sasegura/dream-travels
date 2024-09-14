'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { CustomModal } from '@/components/modal/modal/modal';
import { IItinerary, ITravel } from '@/app/interface';
import { Header1 } from '@/app/style';
import { emptyItinerary } from '@/utils/itinerary';
import { selectTravels } from '@/lib/features/rootSlice';
import { useAppSelector } from '@/lib/hooks';
import {
  CloseButton,
  ContentText,
  DaysTitle,
  DayContent,
  ErrorText,
  LongInput,
  MainForm,
  RoundButton,
  SaveButton,
  ShortInput,
  SLabel,
  Textarea,
  TotalW,
} from './style';

const emptyTravel = {
  title: '',
  description: '',
  id: 0,
  photo_url: '',
  itinerary: [],
  status: '',
};

interface ITripModal {
  id: number;
  isOpen: boolean;
  onCancel: () => void;
  createTravel: (o: Omit<ITravel, 'id'>) => void;
  editTravel: (o: ITravel) => void;
}

const loginSchema = z.object({
  title: z.string().nonempty('Name is required'),
  description: z.string().optional(),
  photo_url: z.string().url('Must be a valid URL').optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function TripModal({
  id,
  isOpen,
  onCancel,
  createTravel,
  editTravel,
}: ITripModal) {
  const [itinerary, setItimerary] = useState<IItinerary[]>([]);
  const travels = useAppSelector(selectTravels);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: emptyTravel,
  });

  useEffect(() => {
    if (id !== 0) {
      const findTravel = travels.find((t) => t.id === id);
      reset(findTravel);
      setItimerary(findTravel?.itinerary || []);
    } else {
      reset(emptyTravel);
      setItimerary([]);
    }
  }, [id, reset, travels]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    id: number,
    field: string
  ) => {
    const tempItinerary = itinerary.map((it) => {
      if (it.day === id) {
        return { ...it, [field]: e.target.value };
      } else {
        return it;
      }
    });
    setItimerary(tempItinerary);
  };

  async function onSubmit(data: LoginFormValues) {
    if (id) {
      editTravel({ ...data, itinerary: itinerary, status: 'todo', id: id });
    } else {
      createTravel({ ...data, itinerary: itinerary, status: 'todo' });
    }
    reset(emptyTravel);
    setItimerary([]);
  }

  return (
    <>
      <CustomModal isOpen={isOpen} onCancel={onCancel}>
        <ContentText>
          <form action='' method='POST' onSubmit={handleSubmit(onSubmit)}>
            <Header1>Create a trip</Header1>
            <CloseButton onClick={onCancel}>×</CloseButton>

            <MainForm>
              <div>
                <SLabel>Name</SLabel>
                <LongInput
                  {...register('title', { required: true })}
                  id='title'
                  name='title'
                  type='text'
                  autoComplete='off'
                  placeholder='Italy'
                />
                {errors?.title && (
                  <ErrorText className='text-red-600 text-sm'>
                    {errors?.title?.message}
                  </ErrorText>
                )}
              </div>

              <div>
                <SLabel>Description</SLabel>
                <Textarea
                  placeholder='Discover the wonders of the Roman empire...'
                  rows={7}
                  {...register('description', { required: true })}
                  id='description'
                  name='description'
                  autoComplete='off'
                />
              </div>

              <div>
                <SLabel>Image</SLabel>
                <LongInput
                  {...register('photo_url', { required: true })}
                  id='photo_url'
                  name='photo_url'
                  type='text'
                  placeholder='Image URL'
                />
                {errors?.photo_url && (
                  <ErrorText className='text-red-600 text-sm'>
                    {errors?.photo_url?.message}
                  </ErrorText>
                )}
              </div>
            </MainForm>

            <DaysTitle>
              <SLabel>Day by day itinerary</SLabel>
              <RoundButton
                type='button'
                onClick={() =>
                  setItimerary(
                    itinerary.concat({
                      ...emptyItinerary,
                      day: itinerary.length + 1,
                    })
                  )
                }
              >
                +
              </RoundButton>
            </DaysTitle>
            {itinerary.map((itin) => (
              <DayContent key={itin.day}>
                <ShortInput
                  value={itin.day}
                  type='number'
                  placeholder='Day'
                  disabled={true}
                  readOnly={true}
                />
                <TotalW>
                  <LongInput
                    type='text'
                    placeholder='Location'
                    value={itin.location}
                    onChange={(e) => handleChange(e, itin.day, 'location')}
                  />

                  <Textarea
                    placeholder='Description'
                    value={itin.description}
                    rows={5}
                    onChange={(e) => handleChange(e, itin.day, 'description')}
                  />
                </TotalW>
              </DayContent>
            ))}
            <SaveButton>Save</SaveButton>
          </form>
        </ContentText>
      </CustomModal>
    </>
  );
}
