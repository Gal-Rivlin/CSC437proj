// src/components/dayPageElement.ts
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import reset from "../styles/reset.css.ts";
import page from "../styles/page.css.ts";
import trippage from "../styles/trippage.css.ts";
import daypage from "../styles/dayPage.css.ts";

import type { TripActivity } from "server/models";

export class DayPageElement extends LitElement {
  @property() date?: string;
  @property() location?: string;
  @property({ type: Array }) activities?: TripActivity[];
  @property({ type: Boolean }) editable: boolean = false;

  private emitEditOverview() {
    if (!this.editable) return;
    this.dispatchEvent(
      new CustomEvent("edit-overview", {
        bubbles: true,
        composed: true,
      })
    );
  }

  private emitEditActivity(index: number) {
    if (!this.editable) return;
    this.dispatchEvent(
      new CustomEvent("edit-activity", {
        detail: { index },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleAddActivity(e: Event) {
    e.stopPropagation();
    if (!this.editable) return;
    this.dispatchEvent(
      new CustomEvent("add-activity", {
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleRemoveActivity(e: Event, index: number) {
    e.stopPropagation();
    if (!this.editable) return;
    this.dispatchEvent(
      new CustomEvent("remove-activity", {
        detail: { index },
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    const acts = this.activities ?? [];

    return html`
      <!-- Overview card (click to edit day) -->
      <div class="day-overview" @click=${() => this.emitEditOverview()}>
        <p class="day-label">${this.date ?? "Day"}</p>
        <p class="day-location ${this.location ? "" : "day-location--empty"}">
          ${this.location ?? "Add a location"}
        </p>
      </div>

      <!-- Activity cards (click to edit activity) -->
      ${acts.map(
        (a, index) => html`
          <div
            class="activity-card"
            @click=${() => this.emitEditActivity(index)}
          >
            <p class="activity-name">${a.name}</p>
            <p
              class="activity-desc ${a.description
                ? ""
                : "activity-desc--empty"}"
            >
              ${a.description ?? "Add a description"}
            </p>

            ${this.editable
              ? html`
                  <div class="activity-actions">
                    <button
                      class="activity-remove-btn"
                      @click=${(e: Event) =>
                        this.handleRemoveActivity(e, index)}
                    >
                      Remove activity
                    </button>
                  </div>
                `
              : null}
          </div>
        `
      )}
      ${this.editable
        ? html`
            <button
              class="activity-add-btn"
              @click=${(e: Event) => this.handleAddActivity(e)}
            >
              + Add activity
            </button>
          `
        : null}
    `;
  }

  static styles = [reset.styles, page.styles, trippage.styles, daypage.styles];
}
