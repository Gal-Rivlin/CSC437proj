// src/services/fullTripData-svc.ts
import { Schema, model } from "mongoose";
import { FullTrip, TripDayData } from "../models/types";

const TripActivitySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
  },
  {
    _id: false,
  }
);

const TripDayDataSchema = new Schema<TripDayData>(
  {
    date: { type: String, trim: true },
    location: { type: String, trim: true },
    activities: [TripActivitySchema], // 🔹 new array of activities
  },
  {
    _id: false,
  }
);

const FullTripSchema = new Schema<FullTrip>(
  {
    id: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    data: [TripDayDataSchema],
  },
  {
    collection: "fullTrips",
  }
);

const FullTripModel = model<FullTrip>("FullTrip", FullTripSchema);

function index(): Promise<FullTrip[]> {
  return FullTripModel.find().lean().exec();
}

function get(id: string): Promise<FullTrip> {
  return FullTripModel.findOne({
    $or: [{ id }, { tripID: id }],
  })
    .lean()
    .exec()
    .then((trip) => {
      if (!trip) throw `${id} Not found`;
      return trip;
    });
}

function create(json: FullTrip): Promise<FullTrip> {
  const t = new FullTripModel(json);
  return t.save();
}

function update(id: string, fullTrip: FullTrip): Promise<FullTrip> {
  return FullTripModel.findOneAndUpdate(
    { $or: [{ id }, { tripID: id }] },
    fullTrip,
    {
      new: true,
    }
  )
    .lean()
    .exec()
    .then((updated) => {
      if (!updated) throw `${id} not updated`;
      return updated as FullTrip;
    });
}

function remove(id: string): Promise<void> {
  return FullTripModel.findOneAndDelete({
    $or: [{ id }, { tripID: id }],
  })
    .exec()
    .then((deleted) => {
      if (!deleted) throw `${id} not deleted`;
    });
}

export default { index, get, create, update, remove };
