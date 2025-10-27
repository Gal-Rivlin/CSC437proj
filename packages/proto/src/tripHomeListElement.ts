import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import type { TripCardData } from "./types.ts";
import reset from "./styles/reset.css.ts";
import page from "./styles/page.css.ts";
import homepage from "./styles/homepage.css.ts";

export async function hydrate(src: string): Promise<TripCardData[]> {
  const res = await fetch(src);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${src}: ${res.status}`);
  }

  const json = await res.json();
  return json as TripCardData[];
}

export class TripHomeListElement extends LitElement {
  @property() src?: string;
  @state() data: TripCardData[] = [];

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

    return html`
      <section class="trip-list">
        ${this.data.map(
          (trip) => html`
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

  static styles = [reset.styles, page.styles, homepage.styles, css``];
}

customElements.define("trip-list", TripHomeListElement);
