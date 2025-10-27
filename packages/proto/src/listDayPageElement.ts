import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import type { TripDayData } from "./types.ts";
import reset from "./styles/reset.css.ts";
import page from "./styles/page.css.ts";
import trippage from "./styles/trippage.css.ts";

export async function hydrate(src: string): Promise<TripDayData[]> {
  const res = await fetch(src);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${src}: ${res.status}`);
  }

  const json = await res.json();

  return json as TripDayData[];
}

export class ListDayPageElement extends LitElement {
  @property() src?: string;
  @state() data: TripDayData[] = [];

  connectedCallback() {
    super.connectedCallback();
    if (this.src) {
      hydrate(this.src)
        .then((data) => (this.data = data))
        .catch((err) => console.error(err));
    }
  }

  override render() {
    if (this.data.length === 0) return html``;

    return html` <div class="trip">
      ${this.data.map(
        (day) => html`
          <trip-day
            date=${day.date}
            location=${day.location}
            itinerary=${day.itinerary}
            bookings=${day.bookings}
            photos=${day.photos}
          ></trip-day>
        `
      )}
    </div>`;
  }

  static styles = [reset.styles, page.styles, trippage.styles, css``];
}

customElements.define("list-day-page", ListDayPageElement);
