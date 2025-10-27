import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";
import page from "./styles/page.css.ts";
import homepage from "./styles/homepage.css.ts";

export class TripHomeElement extends LitElement {
  @property({ attribute: "img-src" }) imgSrc: string = "images/japan.jpg";
  @property() title: string = "Japan Dec 15 - Dec 19";
  @property({ attribute: "edit-href" }) editHref: string = "italy_new.html";
  @property({ attribute: "complete-href" }) completeHref: string =
    "placeholder.html";
  @property({ attribute: "delete-href" }) deleteHref: string =
    "placeholder.html";

  override render() {
    return html`
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

  static styles = [reset.styles, page.styles, homepage.styles, css``];
}

customElements.define("trip-card", TripHomeElement);
