"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var tripHomeListElement_exports = {};
__export(tripHomeListElement_exports, {
  TripHomeListElement: () => TripHomeListElement,
  hydrate: () => hydrate
});
module.exports = __toCommonJS(tripHomeListElement_exports);
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
var import_reset_css = __toESM(require("./styles/reset.css.ts"));
var import_page_css = __toESM(require("./styles/page.css.ts"));
var import_homepage_css = __toESM(require("./styles/homepage.css.ts"));
async function hydrate(src) {
  const res = await fetch(src);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${src}: ${res.status}`);
  }
  const json = await res.json();
  return json;
}
class TripHomeListElement extends import_lit.LitElement {
  @((0, import_decorators.property)()) src;
  @((0, import_decorators.state)()) data = [];
  connectedCallback() {
    super.connectedCallback();
    if (this.src) {
      hydrate(this.src).then((data) => this.data = data).catch((err) => console.error(err));
    }
  }
  render() {
    if (this.data.length === 0) return import_lit.html``;
    return import_lit.html`
      <section class="trip-list">
        ${this.data.map(
      (trip) => import_lit.html`
            <trip-card
              img-src=${trip.imgSrc}
              title=${trip.title}
              edit-href=${trip.editHref}
              complete-href=${trip.completeHref}
              delete-href=${trip.deleteHref}
            ></trip-card>
          `
    )}
      </section>
    `;
  }
  static styles = [import_reset_css.default.styles, import_page_css.default.styles, import_homepage_css.default.styles, import_lit.css``];
}
customElements.define("trip-list", TripHomeListElement);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TripHomeListElement,
  hydrate
});
