import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
`;

export const ImageContainer = styled.div`
  flex: 1;
  position: relative;
  min-width: 300px;
  min-height: 200px;
`;

export const ContentContainer = styled.div`
  position: relative;
  flex: 1;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 300px;
`;

export const Header3 = styled.h3`
  font-size: 24px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: -0.005em;
  text-align: left;
  margin-bottom: 15px;
`;

export const Text1 = styled.p`
  font-size: 16px;
  line-height: 24px;
  text-align: left;
`;

export const Text2 = styled.p`
  font-size: 16px;
  line-height: 20px;
  text-align: left;
`;

export const ButtonTextContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const BaseButtonText = styled.button`
  background: none;
  border: none;
  border-radius: 4px;
  padding: 8px 0;
  cursor: pointer;
  margin-right: 8px;
  font-size: 16px;
  text-decoration: underline;
  margin-left: 0;

  &:hover {
    color: #005bb5;
  }
`;

export const DeleteButtonText = styled.button`
  color: #c93957;
  margin-left: 10px;
  background: none;
  border: none;
  border-radius: 4px;
  padding: 8px 0;
  cursor: pointer;
  margin-right: 8px;
  font-size: 16px;
  text-decoration: underline;

  &:hover {
    color: #005bb5;
  }
`;

export const Tag = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  border: 1px solid #c93957;
  padding: 2px 10px 0px;
  border-radius: 5px;
  font-size: 12px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    position: relative;
    top: -10px;
    right: 0;
    left: 0;
    font-size: 9px;
  }
`;
