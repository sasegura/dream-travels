import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  width: 100%;
`;

export const Topbar = styled.div`
  width: 100%;
  height: 80px;
  padding: 15px;
  gap: 10px;
  border-radius: 15px;
  opacity: 0px;
  background: #121212;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    gap: 10px;
    height: auto;
    justify-content: center;
  }
`;

export const ButtonLink = styled.button`
  background-color: #fff;
  height: 48px;
  padding: 15px;
  gap: 0px;
  border-radius: 100px;
  border: none;
  opacity: 0px;
  line-height: 20px;
  cursor: pointer;
`;

export const CountdownHeader = styled.div`
  background-color: #fff;
  padding: 5px 15px;
  gap: 0px;
  border-radius: 10px;
  border: none;
  opacity: 0px;
  line-height: 20px;
`;

export const BottonLinkContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
`;
