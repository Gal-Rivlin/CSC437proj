export interface TripCardData {
  imgSrc: string;
  title: string;
  editHref: string;
  completeHref: string;
  deleteHref: string;
}

export interface TripDayData {
  date?: string;
  location?: string;
  itinerary?: string;
  bookings?: string;
  photos?: string;
}

export interface HeaderData {
  name?: string;
}
