import styled from 'styled-components';
import { Button } from '@/components/search/style';



export const ModalTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 18px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: end;
  gap: 15px;
  margin-top: 20px;
`;

export const ConfirmButton = styled(Button)`
  background-color: #d9534f;
  color: white;
`;

export const CancelButton = styled(Button)`
  background-color: #f0f0f0;
  color: #333;
`;