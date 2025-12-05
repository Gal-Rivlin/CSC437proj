import { TripCardData, TripDayData, FullTrip } from "server/models";

export type Msg =
  | [
      "user/register",
      { username: string; password: string },
      {
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | [
      "tripcard/create",
      { trip: TripCardData },
      {
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | ["tripcard/request", { tripid: string }]
  | ["tripcard/load", { tripcard: TripCardData }]
  | ["tripday/request", { tripid: string }]
  | ["tripday/load", { tripday: TripDayData }]
  | ["tripcards/request", {}]
  | ["tripcards/load", { tripcards: TripCardData[] }]
  | ["fulltrip/request", { id: string }]
  | ["fulltrip/load", { fullTrips: FullTrip[]; id: string }]
  | ["fulltrip/save", { trip: FullTrip }]
  | ["fulltrip/updateLocal", { trip: FullTrip }]
  | ["trip/delete", { id: string }];
