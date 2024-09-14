import { LoadingContainer, Spinner, LoadingText } from './style';

const Loading = ({ height }: { height?: string }) => {
  return (
    <LoadingContainer data-testid={'loading-container'} height={height}>
      <Spinner data-testid={'spinner'} />
      <LoadingText>Loading...</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;
