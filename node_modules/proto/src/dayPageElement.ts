import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";
import page from "./styles/page.css.ts";
import trippage from "./styles/trippage.css.ts";

export class DayPageElement extends LitElement {
  @property() date?: string;
  @property() location?: string;
  @property() itinerary?: string;
  @property() bookings?: string; // comma-separated string
  @property() photos?: string; // comma-separated string

  override render() {
    const bookingList = this.bookings
      ? this.bookings
          .split(",")
          .map((b) => b.trim())
          .filter(Boolean)
      : [];
    const photoList = this.photos
      ? this.photos
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean)
      : [];

    return html`
      ${this.date || this.location
        ? html`
            <div class="date">
              ${this.date ? html`<p>${this.date}</p>` : null}
              ${this.location ? html`<p>${this.location}</p>` : null}
            </div>
          `
        : null}

      <!-- ITINERARY SECTION -->
      ${this.itinerary
        ? html`
            <div class="itinerary">
              <h4>Itinerary (tentative planning)</h4>
              <p>${this.itinerary}</p>
            </div>
          `
        : null}

      <!-- BOOKINGS SECTION -->
      ${this.bookings
        ? html`
            <div class="bookings">
              <h4>Bookings</h4>
              ${bookingList.map((b) => html`<p>${b}</p>`)}
            </div>
          `
        : null}

      <!-- PHOTOS SECTION -->
      ${this.photos
        ? html`
            <div class="photos">
              <div class="photo-card">
                <strong>Photos</strong><br />
                ${photoList.map(
                  (p) => html`<a href=${p} target="_blank">click for photos</a>`
                )}
              </div>
            </div>
          `
        : null}

      <button class="add-btn" aria-label="Add photo">+</button>
    `;
  }

  static styles = [
    reset.styles,
    page.styles,
    trippage.styles,
    css`
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
    `,
  ];
}

customElements.define("trip-day", DayPageElement);
