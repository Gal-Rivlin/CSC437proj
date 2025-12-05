// src/model.ts
import { TripCardData, TripDayData, FullTrip } from "server/models";

export interface Model {
  tripCards?: TripCardData[];
  tripCardData?: TripCardData;
  tripDayData?: TripDayData;
  fullTrips?: FullTrip[];
  currentFullTrip?: FullTrip;
}

export const init: Model = {};
