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
var dayPageElement_exports = {};
__export(dayPageElement_exports, {
  DayPageElement: () => DayPageElement
});
module.exports = __toCommonJS(dayPageElement_exports);
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
var import_reset_css = __toESM(require("./styles/reset.css.ts"));
var import_page_css = __toESM(require("./styles/page.css.ts"));
var import_trippage_css = __toESM(require("./styles/trippage.css.ts"));
class DayPageElement extends import_lit.LitElement {
  @((0, import_decorators.property)()) date;
  @((0, import_decorators.property)()) location;
  @((0, import_decorators.property)()) itinerary;
  @((0, import_decorators.property)()) bookings;
  @((0, import_decorators.property)()) photos;
  // comma-separated string
  render() {
    const bookingList = this.bookings ? this.bookings.split(",").map((b) => b.trim()).filter(Boolean) : [];
    const photoList = this.photos ? this.photos.split(",").map((p) => p.trim()).filter(Boolean) : [];
    return import_lit.html`
      ${this.date || this.location ? import_lit.html`
            <div class="date">
              ${this.date ? import_lit.html`<p>${this.date}</p>` : null}
              ${this.location ? import_lit.html`<p>${this.location}</p>` : null}
            </div>
          ` : null}

      <!-- ITINERARY SECTION -->
      ${this.itinerary ? import_lit.html`
            <div class="itinerary">
              <h4>Itinerary (tentative planning)</h4>
              <p>${this.itinerary}</p>
            </div>
          ` : null}

      <!-- BOOKINGS SECTION -->
      ${this.bookings ? import_lit.html`
            <div class="bookings">
              <h4>Bookings</h4>
              ${bookingList.map((b) => import_lit.html`<p>${b}</p>`)}
            </div>
          ` : null}

      <!-- PHOTOS SECTION -->
      ${this.photos ? import_lit.html`
            <div class="photos">
              <div class="photo-card">
                <strong>Photos</strong><br />
                ${photoList.map(
      (p) => import_lit.html`<a href=${p} target="_blank">click for photos</a>`
    )}
              </div>
            </div>
          ` : null}

      <button class="add-btn" aria-label="Add photo">+</button>
    `;
  }
  static styles = [
    import_reset_css.default.styles,
    import_page_css.default.styles,
    import_trippage_css.default.styles,
    import_lit.css`
      :host {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        margin-bottom: 1rem;
        background: var(--surface-bg);
        border-radius: 8px;
        align-items: stretch;
        box-sizing: border-box;
        height: 200px;
        flex-wrap: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        box-sizing: border-box;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      :host > div {
        margin-right: 1rem;
        color: var(--light-text);
        flex: 0 0 auto;
        height: auto;
        padding: 1rem;
        align-self: stretch;
        background: var(--card-bg);
        padding: 1rem;
        border-radius: 6px;
        min-width: 150px;
      }
      :host > button {
        align-self: center;
      }
    `
  ];
}
customElements.define("trip-day", DayPageElement);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DayPageElement
});
