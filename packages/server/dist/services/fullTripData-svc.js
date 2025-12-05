"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var fullTripData_svc_exports = {};
__export(fullTripData_svc_exports, {
  default: () => fullTripData_svc_default
});
module.exports = __toCommonJS(fullTripData_svc_exports);
var import_mongoose = require("mongoose");
const TripActivitySchema = new import_mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true }
  },
  {
    _id: false
  }
);
const TripDayDataSchema = new import_mongoose.Schema(
  {
    date: { type: String, trim: true },
    location: { type: String, trim: true },
    activities: [TripActivitySchema]
    // 🔹 new array of activities
  },
  {
    _id: false
  }
);
const FullTripSchema = new import_mongoose.Schema(
  {
    id: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    data: [TripDayDataSchema]
  },
  {
    collection: "fullTrips"
  }
);
const FullTripModel = (0, import_mongoose.model)("FullTrip", FullTripSchema);
function index() {
  return FullTripModel.find().lean().exec();
}
function get(id) {
  return FullTripModel.findOne({
    $or: [{ id }, { tripID: id }]
  }).lean().exec().then((trip) => {
    if (!trip) throw `${id} Not found`;
    return trip;
  });
}
function create(json) {
  const t = new FullTripModel(json);
  return t.save();
}
function update(id, fullTrip) {
  return FullTripModel.findOneAndUpdate(
    { $or: [{ id }, { tripID: id }] },
    fullTrip,
    {
      new: true
    }
  ).lean().exec().then((updated) => {
    if (!updated) throw `${id} not updated`;
    return updated;
  });
}
function remove(id) {
  return FullTripModel.findOneAndDelete({
    $or: [{ id }, { tripID: id }]
  }).exec().then((deleted) => {
    if (!deleted) throw `${id} not deleted`;
  });
}
var fullTripData_svc_default = { index, get, create, update, remove };
