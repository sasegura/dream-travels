import { FilterTrip } from '@/app/interface';
import { ButtonGroup, TabButton } from './style';

export const Tabs = ({
  selectedButton,
  setSelectedButton,
}: {
  selectedButton: string;
  setSelectedButton: (v: FilterTrip) => void;
}) => {
  return (
    <ButtonGroup>
      <TabButton
        $selected={selectedButton === 'all'}
        onClick={() => setSelectedButton('all')}
      >
        All
      </TabButton>
      <TabButton
        $selected={selectedButton === 'upcoming'}
        onClick={() => setSelectedButton('upcoming')}
      >
        Upcoming
      </TabButton>
      <TabButton
        $selected={selectedButton === 'completed'}
        onClick={() => setSelectedButton('completed')}
      >
        Completed
      </TabButton>
    </ButtonGroup>
  );
};
