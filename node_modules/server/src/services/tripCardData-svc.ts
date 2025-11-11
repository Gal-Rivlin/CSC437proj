// src/services/traveler-svc.ts
import { Schema, model } from "mongoose";
import { TripCardData } from "../models/types";

const TripCardDataSchema = new Schema<TripCardData>(
  {
    tripID: { type: String, required: true, trim: true },
    imgSrc: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    editHref: { type: String, required: true, trim: true },
    completeHref: { type: String, required: true, trim: true },
    deleteHref: { type: String, required: true, trim: true },
  },
  {
    collection: "traveling",
  }
);

const TripCardDataModel = model<TripCardData>(
  "TripCardData",
  TripCardDataSchema
);

function index(): Promise<TripCardData[]> {
  return TripCardDataModel.find().lean().exec();
}

function get(tripID: string): Promise<TripCardData> {
  return TripCardDataModel.find({ tripID })
    .then((list) => list[0])
    .catch((err) => {
      throw `${tripID} Not found`;
    });
}

// in src/services/traveler-svc.ts:
function create(json: TripCardData): Promise<TripCardData> {
  const t = new TripCardDataModel(json);
  return t.save();
}

function update(tripID: String, tripCard: TripCardData): Promise<TripCardData> {
  return TripCardDataModel.findOneAndUpdate({ tripID }, tripCard, {
    new: true,
  }).then((updated) => {
    if (!updated) throw `${tripID} not updated`;
    else return updated as TripCardData;
  });
}

function remove(tripID: String): Promise<void> {
  return TripCardDataModel.findOneAndDelete({ tripID }).then((deleted) => {
    if (!deleted) throw `${tripID} not deleted`;
  });
}

export default { index, get, create, update, remove };
