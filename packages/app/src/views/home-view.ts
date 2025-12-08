// src/views/home-view.ts
import { View } from "@calpoly/mustang";
import { html } from "lit";
import { state } from "lit/decorators.js";

import type { Model } from "../model";
import type { Msg } from "../messages";
import type { TripCardData } from "server/models";

import reset from "../styles/reset.css.ts";
import page from "../styles/page.css.ts";
import homepage from "../styles/homepage.css.ts";

export class HomeViewElement extends View<Model, Msg> {
  constructor() {
    super("traveling:model");
  }

  @state()
  get tripcards(): TripCardData[] | undefined {
    return this.model.tripCards;
  }

  connectedCallback() {
    super.connectedCallback();

    console.log("[HomeView] connected; tripcards =", this.tripcards);

    if (!this.tripcards || this.tripcards.length === 0) {
      this.dispatchMessage(["tripcards/request", {}]);
    }
  }

  private onTripDelete = (event: CustomEvent<{ id: string }>) => {
    const { id } = event.detail;
    if (!id) return;

    this.dispatchMessage(["trip/delete", { id }]);
  };

  static styles = [reset.styles, page.styles, homepage.styles];

  override render() {
    console.log("[HomeView] render; tripcards =", this.tripcards);
    return html`
      <main class="home">
        <trip-header></trip-header>

        <section class="trip-list" @trip-delete=${this.onTripDelete}>
          ${this.tripcards && this.tripcards.length
            ? this.tripcards.map(
                (trip) => html`
                  <trip-card
                    trip-id=${trip.id}
                    img-src=${trip.imgSrc}
                    title=${trip.title}
                    complete-href=${trip.completeHref}
                    delete-href=${trip.deleteHref}
                  ></trip-card>
                `
              )
            : html`<p>No trips found.</p>`}
        </section>

        <div class="cta-wrap">
          <a href="/app/trip/new" class="cta">Create New Trip</a>
        </div>
      </main>
    `;
  }
}
