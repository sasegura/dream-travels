import styled from 'styled-components';

export const ContentText = styled.div`
  padding: 30px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background: #333;
  }
`;

import { Button, SInput, STextArea } from '@/components/search/style';

export const SLabel = styled.label`
  display: block;
  font-size: 14px;
`;

export const LongInput = styled(SInput)`
  width: 100%;
  margin-top: 5px;
`;

export const ShortInput = styled(SInput)`
  width: 100px;
  margin-top: 5px;
`;

export const Textarea = styled(STextArea)`
  width: 100%;
  margin-top: 5px;
  border-radius: 15px;
`;

export const MainForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const DayContent = styled.div`
  display: flex;
  flex-direction: rows;
  gap: 15px;
  border-radius: 20px;
  background: #f3f3f3;
  padding: 10px;
  margin-bottom: 5px;
`;

export const TotalW = styled.div`
  width: 100%;
`;

export const RoundButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: 1px solid #121212;
  border-radius: 50%;
  background: none;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;

  &:hover {
    background: #f0f0f0;
  }

  &:focus {
    outline: none;
  }
`;

export const DaysTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 5px;
`;

export const SaveButton = styled(Button)`
  font-size: 16px;
  height: 48px;
  width: 160px;
  margin-top: 24px;
`;

export const ErrorText = styled.span`
  color: #c93957;
  font-size: 12px;
  margin-left: 15px;
`;
