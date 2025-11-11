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
var tripHomeElementWrapper_exports = {};
__export(tripHomeElementWrapper_exports, {
  TripHomeElementWrapper: () => TripHomeElementWrapper,
  hydrate: () => hydrate
});
module.exports = __toCommonJS(tripHomeElementWrapper_exports);
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
async function hydrate(src) {
  const res = await fetch(src);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${src}: ${res.status}`);
  }
  const json = await res.json();
  const data = {
    imgSrc: json.imgSrc,
    title: json.title,
    editHref: json.editHref,
    completeHref: json.completeHref,
    deleteHref: json.deleteHref
  };
  return data;
}
class TripHomeElementWrapper extends import_lit.LitElement {
  @((0, import_decorators.property)()) src;
  @((0, import_decorators.state)()) data;
  connectedCallback() {
    super.connectedCallback();
    if (this.src) {
      hydrate(this.src).then((data) => this.data = data).catch((err) => console.error(err));
    }
  }
  render() {
    if (!this.data) return import_lit.html``;
    return import_lit.html`
      <trip-card
        img-src=${this.data.imgSrc}
        title=${this.data.title}
        edit-href=${this.data.editHref}
        complete-href=${this.data.completeHref}
        delete-href=${this.data.deleteHref}
      ></trip-card>
    `;
  }
}
customElements.define("trip-card-wrapper", TripHomeElementWrapper);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TripHomeElementWrapper,
  hydrate
});
