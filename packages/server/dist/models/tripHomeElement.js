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
var tripHomeElement_exports = {};
__export(tripHomeElement_exports, {
  TripHomeElement: () => TripHomeElement
});
module.exports = __toCommonJS(tripHomeElement_exports);
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
var import_reset_css = __toESM(require("./styles/reset.css.ts"));
var import_page_css = __toESM(require("./styles/page.css.ts"));
var import_homepage_css = __toESM(require("./styles/homepage.css.ts"));
class TripHomeElement extends import_lit.LitElement {
  @((0, import_decorators.property)({ attribute: "img-src" })) imgSrc = "images/japan.jpg";
  @((0, import_decorators.property)()) title = "Japan Dec 15 - Dec 19";
  @((0, import_decorators.property)({ attribute: "edit-href" })) editHref = "italy_new.html";
  @((0, import_decorators.property)({ attribute: "complete-href" })) completeHref = "placeholder.html";
  @((0, import_decorators.property)({ attribute: "delete-href" })) deleteHref = "placeholder.html";
  render() {
    return import_lit.html`
      <article class="trip-card">
        <div class="thumb">
          <img src=${this.imgSrc} alt=${this.title} />
        </div>
        <h3 class="trip-title">${this.title}</h3>
        <div class="actions">
          <a class="btn" href=${this.editHref}>
            Edit trip
            <svg class="icon"><use href="/icons/every.svg#edit"></use></svg>
          </a>
          <a class="btn btn-ghost-danger" href=${this.completeHref}>
            Complete trip
            <svg class="icon"><use href="/icons/every.svg#finish"></use></svg>
          </a>
          <a class="btn btn-ghost-danger" href=${this.deleteHref}>
            Delete Trip
            <svg class="icon"><use href="/icons/every.svg#delete"></use></svg>
          </a>
        </div>
      </article>
    `;
  }
  static styles = [import_reset_css.default.styles, import_page_css.default.styles, import_homepage_css.default.styles, import_lit.css``];
}
customElements.define("trip-card", TripHomeElement);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TripHomeElement
});
