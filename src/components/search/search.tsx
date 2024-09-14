'use client';
import { setSearchText } from '@/lib/features/rootSlice';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CustomSInput, SButton, SContainer } from './style';

interface iDefault {
  defaultValue: string;
}

export const SearchInput = ({ defaultValue }: iDefault) => {
  const [inputValue, setValue] = useState(defaultValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setValue(inputValue);
  };
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(setSearchText(inputValue));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') return handleSearch();
  };

  return (
    <div className='search__input border-[2px] border-solid border-slate-500 flex flex-row items-center gap-5 p-1 rounded-[15px]'>
      <SContainer>
        <CustomSInput
          placeholder='Search trips'
          value={inputValue ?? ''}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          type='text'
        />
        <SButton type='button' onClick={handleSearch}>
          Search
        </SButton>
      </SContainer>
    </div>
  );
};
