import styled from 'styled-components';

export const ImageContainer = styled.div`
  width: 100%;
  height: 250px;
  position: relative;
  background: #f0f0f0;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const ModalContent = styled.div`
  position: relative;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  padding: 0;
`;

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

export const Loading = styled.div`
  font-size: 18px;
  color: #333;
`;

export const Error = styled.div`
  font-size: 18px;
  color: red;
`;

export const Separator = styled.div`
  width: 100%;
  border-bottom: 1px solid #d8d8d8;
  margin: 25px 0;
`;

export const TimelineContainer = styled.div`
  position: relative;
  margin: 25px 0 0 5px;
`;

export const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 40px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 0;

  &:last-child::before {
    display: none;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #121212;
    transform: translate(-50%, 14px);
    margin-bottom: -40px;
  }
`;

export const TimelinePoint = styled.div`
  position: absolute;
  left: -5px;
  width: 10px;
  height: 10px;
  margin-top: 4px;
  border-radius: 50%;
  background: #121212;
  z-index: 1;
`;

export const ButtonCheck = styled.button`
  color: #898989;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 25px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
`;

export const LightText = styled.p`
  color: #898989;
`;
