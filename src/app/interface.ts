export interface ITravel {
  travel?: string;
  id: number;
  title: string;
  description?: string;
  photo_url?: string;
  itinerary: IItinerary[];
  status: string;
}

export interface IItinerary {
  day: number;
  location: string;
  description: string;
}
