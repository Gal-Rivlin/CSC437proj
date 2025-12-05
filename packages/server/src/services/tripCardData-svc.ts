// src/services/tripCardData-svc.ts
import { Schema, model } from "mongoose";
import { TripCardData } from "../models/types";

const TripCardDataSchema = new Schema<TripCardData>(
  {
    id: { type: String, required: true, trim: true },
    // Optional legacy support: if your old docs have tripID, you can add:
    // tripID: { type: String, trim: true },
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

// Accept either id or legacy tripID
function get(tripID: string): Promise<TripCardData> {
  return TripCardDataModel.findOne({
    $or: [{ id: tripID }, { tripID }],
  })
    .lean()
    .exec()
    .then((doc) => {
      if (!doc) throw `${tripID} Not found`;
      return doc;
    });
}

function create(json: TripCardData): Promise<TripCardData> {
  // If a caller only provided id, you can (optionally) mirror it into tripID
  // ; (json as any).tripID = json.id;
  const t = new TripCardDataModel(json);
  return t.save();
}

// Accept either id or legacy tripID
function update(tripID: string, tripCard: TripCardData): Promise<TripCardData> {
  return TripCardDataModel.findOneAndUpdate(
    {
      $or: [{ id: tripID }, { tripID }],
    },
    tripCard,
    {
      new: true,
    }
  )
    .lean()
    .exec()
    .then((updated) => {
      if (!updated) throw `${tripID} not updated`;
      return updated as TripCardData;
    });
}

// Accept either id or legacy tripID
function remove(tripID: string): Promise<void> {
  return TripCardDataModel.findOneAndDelete({
    $or: [{ id: tripID }, { tripID }],
  })
    .exec()
    .then((deleted) => {
      if (!deleted) throw `${tripID} not deleted`;
    });
}

export default { index, get, create, update, remove };
