import { html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { TripCardData } from "./types";

export async function hydrate(src: string) {
  const res = await fetch(src);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${src}: ${res.status}`);
  }

  const json = await res.json();

  const data: TripCardData = {
    imgSrc: json.imgSrc,
    title: json.title,
    editHref: json.editHref,
    completeHref: json.completeHref,
    deleteHref: json.deleteHref,
  };

  return data;
}

export class TripHomeElementWrapper extends LitElement {
  @property() src?: string;
  @state() data?: TripCardData;

  connectedCallback() {
    super.connectedCallback();
    if (this.src) {
      hydrate(this.src)
        .then((data) => (this.data = data))
        .catch((err) => console.error(err));
    }
  }

  override render() {
    if (!this.data) return html``;

    return html`
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
