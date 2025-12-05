export interface TripCardData {
  id: string;
  imgSrc: string;
  title: string;
  editHref: string;
  completeHref: string;
  deleteHref: string;
}

export interface TripActivity {
  name: string;
  description: string;
}

export interface TripDayData {
  date?: string;
  location?: string; // overview card fields
  activities?: TripActivity[]; // per-day activity cards
}

export interface FullTrip {
  name: string;
  id: string;
  data?: TripDayData[];
}

export interface HeaderData {
  name?: string;
}
