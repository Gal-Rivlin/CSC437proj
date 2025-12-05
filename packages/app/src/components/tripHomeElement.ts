// src/components/TripHomeElement.ts
import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "../styles/reset.css.ts";
import page from "../styles/page.css.ts";
import homepage from "../styles/homepage.css.ts";

export class TripHomeElement extends LitElement {
  @property({ attribute: "img-src" }) imgSrc: string = "images/japan.jpg";
  @property() title: string = "Japan Dec 15 - Dec 19";
  @property({ attribute: "trip-id" }) tripId: string = "";

  private handleDeleteClick = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    if (!this.tripId) return;

    this.dispatchEvent(
      new CustomEvent("trip-delete", {
        detail: { id: this.tripId },
        bubbles: true,
        composed: true,
      })
    );
  };

  override render() {
    const planHref = `/app/trip/plan?id=${this.tripId}`;

    return html`
      <article class="trip-card">
        <div class="thumb">
          <img src=${this.imgSrc} alt=${this.title} />
        </div>
        <h3 class="trip-title">${this.title}</h3>
        <div class="actions">
          <a class="btn" href=${planHref}>
            Edit trip
            <svg class="icon"><use href="/icons/every.svg#edit"></use></svg>
          </a>
          <button
            class="btn btn-ghost-danger"
            type="button"
            @click=${this.handleDeleteClick}
          >
            Delete Trip
            <svg class="icon"><use href="/icons/every.svg#delete"></use></svg>
          </button>
        </div>
      </article>
    `;
  }

  static styles = [reset.styles, page.styles, homepage.styles, css``];
}
