
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $selected?: boolean;
  $first?: boolean;
  $last?: boolean;
}

export const Header1 = styled.h1`
  font-size: 32px;
  font-weight: 400;
  line-height: 40px;
  letter-spacing: -0.01em;
  margin-bottom: 10px;
`;

export const Subtitle = styled.span`
  font-size: 20px;
  font-weight: 400;
  line-height: 25px;
  text-align: center;
`;

export const MainPage = styled.main`
  display: flex;
  flex-direction: column;
  grid-row-start: 2;
  padding: 70px 0;
  text-align: center;
  max-width: 1560px;
  margin:auto;
`;

export const Travels = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 50px;
  overflow: hidden;
  width: fit-content;
  margin: 0 auto 20px;
`;

export const TabButton = styled.button<ButtonProps>`
  background-color: ${({ $selected }) => ($selected ? '#F3F3F3' : 'white')};
  padding: 10px 20px;
  border: none;
  height: 48px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 16px;

  &:not(:last-child) {
    border-right: 1px solid #d8d8d8;
  }

  &:hover {
    background-color: #f3f3f3;
  }

  &:focus {
    outline: none;
  }
`;





