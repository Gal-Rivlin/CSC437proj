// src/update.ts
import { Auth, ThenUpdate } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { TripCardData, TripDayData, FullTrip } from "server/models";

export default function update(
  message: Msg,
  model: Model,
  user: Auth.User
): Model | ThenUpdate<Model, Msg> {
  const [type, payload, callbacks] = message as any;

  switch (type) {
    case "tripcards/request": {
      return [
        model,
        requestTripCards(user).then((tripcards) => [
          "tripcards/load",
          { tripcards },
        ]),
      ];
    }

    case "user/register": {
      const reactions =
        callbacks ||
        ({} as {
          onSuccess?: () => void;
          onFailure?: (e: Error) => void;
        });

      return [
        model,
        registerUser(payload).then(
          () => {
            if (reactions.onSuccess) reactions.onSuccess();
            return ["tripcards/request", {}] as Msg;
          },
          (err: Error) => {
            if (reactions.onFailure) reactions.onFailure(err);
            throw err;
          }
        ),
      ];
    }

    case "tripcards/load": {
      const { tripcards } = payload;
      return { ...model, tripCards: tripcards };
    }

    case "tripcard/request": {
      const { tripid } = payload;

      if (model.tripCardData && (model.tripCardData as any).tripID === tripid) {
        return model;
      }

      return [
        { ...model, tripCardData: { id: tripid } as TripCardData },
        requestTripCard(payload, user).then((tripcard) => [
          "tripcard/load",
          { tripcard },
        ]),
      ];
    }

    case "tripcard/load": {
      const { tripcard } = payload;
      return { ...model, tripCardData: tripcard };
    }

    case "tripday/request": {
      return [
        model,
        requestTripDay(payload, user).then((tripday) => [
          "tripday/load",
          { tripday },
        ]),
      ];
    }

    case "tripday/load": {
      const { tripday } = payload;
      return { ...model, tripDayData: tripday };
    }

    case "fulltrip/request": {
      const { id } = payload;

      if (model.currentFullTrip && model.currentFullTrip.id === id) {
        return model;
      }

      return [
        model,
        requestFullTrips(user).then((fullTrips) => [
          "fulltrip/load",
          { fullTrips, id },
        ]),
      ];
    }

    case "fulltrip/load": {
      const { fullTrips, id } = payload;

      const currentFullTrip = fullTrips.find((t: FullTrip) => t.id === id);
      if (!currentFullTrip) {
        console.warn(
          `FullTrip with id "${id}" not found in fullTrips`,
          fullTrips
        );
      }

      return {
        ...model,
        fullTrips,
        currentFullTrip,
      };
    }

    case "fulltrip/save": {
      const { trip } = payload as { trip: FullTrip };
      const reactions =
        callbacks ||
        ({} as {
          onSuccess?: () => void;
          onFailure?: (e: Error) => void;
        });

      const updatedFullTrips = model.fullTrips
        ? model.fullTrips.map((t) => (t.id === trip.id ? trip : t))
        : [trip];

      const optimisticModel: Model = {
        ...model,
        fullTrips: updatedFullTrips,
        currentFullTrip: trip,
      };

      return [
        optimisticModel,
        saveFullTrip(trip, user).then(
          (serverTrip) => {
            if (reactions.onSuccess) reactions.onSuccess();
            return ["fulltrip/updateLocal", { trip: serverTrip }] as Msg;
          },
          (err: Error) => {
            if (reactions.onFailure) reactions.onFailure(err);
            throw err;
          }
        ),
      ];
    }

    case "fulltrip/updateLocal": {
      const { trip } = payload as { trip: FullTrip };

      const updatedFullTrips = model.fullTrips
        ? model.fullTrips.map((t) => (t.id === trip.id ? trip : t))
        : [trip];

      return {
        ...model,
        fullTrips: updatedFullTrips,
        currentFullTrip: trip,
      };
    }

    case "trip/delete": {
      const { id } = payload as { id: string };

      return [
        model,
        deleteTrip(id, user).then(() => {
          return ["tripcards/request", {}] as Msg;
        }),
      ];
    }

    case "tripcard/create": {
      const { trip } = payload;
      const reactions =
        callbacks ||
        ({} as {
          onSuccess?: () => void;
          onFailure?: (e: Error) => void;
        });

      return [
        model,
        createTripCard(trip, user)
          .then((createdCard) => createFullTripFromCard(createdCard, user))
          .then(() => {
            if (reactions.onSuccess) reactions.onSuccess();
            return ["tripcards/request", {}] as Msg;
          })
          .catch((err: Error) => {
            if (reactions.onFailure) reactions.onFailure(err);
            throw err;
          }),
      ];
    }

    default: {
      console.warn(`Unhandled model message "${type}"`, payload);
      return model;
    }
  }
}

function requestTripCards(user: Auth.User): Promise<TripCardData[]> {
  return fetch("/api/tripcards/", {
    headers: Auth.headers(user),
  })
    .then((res) => {
      if (!res.ok) throw "Failed to fetch trip cards";
      return res.json();
    })
    .then((json: any[]) => {
      console.log("DEBUG tripcards:", json);

      if (!Array.isArray(json)) {
        throw "Trip cards response was not an array";
      }

      return json.map((t) => ({
        ...t,
        id: t.id ?? t.tripID ?? t._id,
      })) as TripCardData[];
    });
}

function requestTripCard(
  payload: { tripid: string },
  user: Auth.User
): Promise<TripCardData> {
  return fetch(`/api/tripcards/${payload.tripid}`, {
    headers: Auth.headers(user),
  })
    .then((res) => {
      if (!res.ok) throw "Failed to fetch single trip card";
      return res.json();
    })
    .then((json: any) => {
      console.log("DEBUG tripcard:", json);

      return {
        ...json,
        id: json.id ?? json.tripID ?? json._id,
      } as TripCardData;
    });
}

function requestTripDay(
  payload: { tripid: string },
  user: Auth.User
): Promise<TripDayData> {
  return fetch(`/api/tripdays/${payload.tripid}`, {
    headers: Auth.headers(user),
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      throw "No response from server when requesting trip day data";
    })
    .then((json: unknown) => {
      if (json) return json as TripDayData;
      throw "No JSON in trip day response";
    });
}

function requestFullTrips(user: Auth.User): Promise<FullTrip[]> {
  return fetch("/api/fulltrip", {
    headers: Auth.headers(user),
  })
    .then((res) => {
      if (!res.ok) throw "Failed to fetch full trips";
      return res.json();
    })
    .then((json: any) => {
      console.log("DEBUG /api/fulltrip raw:", json);

      if (!Array.isArray(json)) {
        throw "Full trips response was not an array";
      }

      return json.map((t: any) => ({
        ...t,
        id: t.id ?? t.Id ?? t.tripID ?? t._id,
      })) as FullTrip[];
    });
}

function registerUser(msg: {
  username: string;
  password: string;
}): Promise<void> {
  return fetch("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msg),
  })
    .then((res: Response) => {
      if (res.status === 201) return res.json();
      return res.text().then((text) => {
        throw new Error(
          text || `Failed to register user (status ${res.status})`
        );
      });
    })
    .then((json: any) => {
      if (!json || !json.token) {
        throw new Error("No token in /auth/register response");
      }
      sessionStorage.setItem("signup-token", json.token as string);
    });
}

function createTripCard(
  trip: TripCardData,
  user: Auth.User
): Promise<TripCardData> {
  return fetch("/api/tripcards", {
    method: "POST",
    headers: {
      ...Auth.headers(user),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trip),
  }).then((res) => {
    if (!res.ok) {
      return res.text().then((t) => {
        throw new Error(t || "Failed to create trip card");
      });
    }
    return res.json();
  });
}

function createFullTripFromCard(
  card: TripCardData,
  user: Auth.User
): Promise<FullTrip> {
  const fullTrip: FullTrip = {
    id: card.id,
    name: card.title,
    data: [
      {
        date: "Day 1",
        location: "TBD",
        activities: [
          {
            name: "Plan this day",
            description: "Add activities, food spots, and bookings here.",
          },
        ],
      },
    ],
  };

  return fetch("/api/fulltrip", {
    method: "POST",
    headers: {
      ...Auth.headers(user),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fullTrip),
  }).then((res) => {
    if (!res.ok) {
      return res.text().then((t) => {
        throw new Error(t || "Failed to create full trip");
      });
    }
    return res.json();
  });
}

function saveFullTrip(trip: FullTrip, user: Auth.User): Promise<FullTrip> {
  if (!trip.id) {
    return Promise.reject(new Error("FullTrip is missing id"));
  }

  return fetch(`/api/fulltrip/${trip.id}`, {
    method: "PUT",
    headers: {
      ...Auth.headers(user),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trip),
  }).then((res) => {
    if (!res.ok) {
      return res.text().then((t) => {
        throw new Error(t || "Failed to save full trip");
      });
    }
    return res.json();
  });
}

function deleteTrip(id: string, user: Auth.User): Promise<void> {
  const headers = Auth.headers(user);

  const deleteCard = fetch(`/api/tripcards/${id}`, {
    method: "DELETE",
    headers,
  }).then((res) => {
    if (!res.ok && res.status !== 404) {
      return res.text().then((t) => {
        throw new Error(t || `Failed to delete trip card ${id}`);
      });
    }
  });

  const deleteFullTrip = fetch(`/api/fulltrip/${id}`, {
    method: "DELETE",
    headers,
  }).then((res) => {
    if (!res.ok && res.status !== 404) {
      return res.text().then((t) => {
        throw new Error(t || `Failed to delete full trip ${id}`);
      });
    }
  });

  return Promise.all([deleteCard, deleteFullTrip]).then(() => undefined);
}
