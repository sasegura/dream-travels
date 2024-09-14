import { ITravel } from '@/app/interface';

export function filterTravels(
  travels: ITravel[],
  tab: string,
  searchString: string
): ITravel[] {
  let filteredTravels: ITravel[];
  switch (tab) {
    case 'all':
      filteredTravels = travels;
      break;
    case 'upcoming':
      filteredTravels = travels.filter((travel) => travel.status === 'todo');
      break;
    case 'completed':
      filteredTravels = travels.filter((travel) => travel.status === 'done');
      break;
    default:
      filteredTravels = travels;
      break;
  }

  if (searchString) {
    const lowerCaseSearch = searchString.toLowerCase();
    filteredTravels = filteredTravels.filter(
      (travel) =>
        travel.title.toLowerCase().includes(lowerCaseSearch) ||
        travel?.description?.toLowerCase().includes(lowerCaseSearch)
    );
  }

  return filteredTravels;
}

export function updatedTravels(
  travels: ITravel[],
  travelUpdated: ITravel
): ITravel[] {
  const filteredTravels = travels.map((travel: ITravel) => {
    if (travel.id === travelUpdated.id) {
      return travelUpdated;
    } else {
      return travel;
    }
  });

  return filteredTravels;
}
