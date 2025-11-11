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
var tripCardData_svc_exports = {};
__export(tripCardData_svc_exports, {
  default: () => tripCardData_svc_default
});
module.exports = __toCommonJS(tripCardData_svc_exports);
var import_mongoose = require("mongoose");
const TripCardDataSchema = new import_mongoose.Schema(
  {
    tripID: { type: String, required: true, trim: true },
    imgSrc: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    editHref: { type: String, required: true, trim: true },
    completeHref: { type: String, required: true, trim: true },
    deleteHref: { type: String, required: true, trim: true }
  },
  {
    collection: "traveling"
  }
);
const TripCardDataModel = (0, import_mongoose.model)(
  "TripCardData",
  TripCardDataSchema
);
function index() {
  return TripCardDataModel.find().lean().exec();
}
function get(tripID) {
  return TripCardDataModel.find({ tripID }).then((list) => list[0]).catch((err) => {
    throw `${tripID} Not found`;
  });
}
function create(json) {
  const t = new TripCardDataModel(json);
  return t.save();
}
function update(tripID, tripCard) {
  return TripCardDataModel.findOneAndUpdate({ tripID }, tripCard, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${tripID} not updated`;
    else return updated;
  });
}
function remove(tripID) {
  return TripCardDataModel.findOneAndDelete({ tripID }).then((deleted) => {
    if (!deleted) throw `${tripID} not deleted`;
  });
}
var tripCardData_svc_default = { index, get, create, update, remove };
