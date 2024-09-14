import styled from 'styled-components';

export const SContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 25px auto 60px;
`;

export const SInput = styled.input`
  height: 48px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 25px;
  transition: border-color 0.3s ease;
  outline: none;
  position: relative;

  &::placeholder {
    color: #898989;
  }

  &:focus {
    border: 1px solid #121212;
    outline: none;
  }
`;
export const STextArea = styled.textarea`
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 25px;
  transition: border-color 0.3s ease;
  outline: none;
  position: relative;

  &::placeholder {
    color: #898989;
  }

  &:focus {
    border: 1px solid #121212;
    outline: none;
  }
`;

export const CustomSInput = styled(SInput)`
  margin: 0 20px;
  width: 365px;
`;

export const Button = styled.button`
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 10px 15px;
  gap: 0px;
  border-radius: 100px;
  border: 0;
  opacity: 0px;
  background: #121212;
  font-size: 14px;
  line-height: 17.5px;
  color: #fff;
  outline: none;

  &:hover {
    color: #bbbfca;
  }
`;

export const SButton = styled(Button)`
  position: absolute;
  right: 24px;
`;