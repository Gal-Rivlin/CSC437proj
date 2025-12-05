// src/components/listDayPageElement.ts
import { html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import type { TripDayData } from "server/models";

import reset from "../styles/reset.css.ts";
import page from "../styles/page.css.ts";
import trippage from "../styles/trippage.css.ts";
import listday from "../styles/listDayPage.css.ts";

export async function hydrate(src: string): Promise<TripDayData[]> {
  const res = await fetch(src);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${src}: ${res.status}`);
  }

  const json = await res.json();

  if (Array.isArray(json)) return json as TripDayData[];
  if (json && Array.isArray(json.data)) return json.data as TripDayData[];

  console.warn(
    "list-day-page hydrate: response was not TripDayData[] or { data: TripDayData[] }",
    json
  );
  return [];
}

export class ListDayPageElement extends LitElement {
  @property({ type: Array }) data?: TripDayData[];
  @property() src?: string;

  @state() private fetched: TripDayData[] = [];

  connectedCallback() {
    super.connectedCallback();
    if (!this.data && this.src) {
      this.loadFromSrc();
    }
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("src") && !this.data && this.src) {
      this.loadFromSrc();
    }
  }

  private async loadFromSrc() {
    if (!this.src) return;
    try {
      const list = await hydrate(this.src);
      this.fetched = list;
    } catch (err) {
      console.error(err);
      this.fetched = [];
    }
  }

  private handleAddDay = () => {
    this.dispatchEvent(
      new CustomEvent("add-day", {
        bubbles: true,
        composed: true,
      })
    );
  };

  private handleRemoveDay(index: number) {
    this.dispatchEvent(
      new CustomEvent("remove-day", {
        detail: { index },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleAddActivity(dayIndex: number) {
    this.dispatchEvent(
      new CustomEvent("add-activity", {
        detail: { dayIndex },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleRemoveActivity(dayIndex: number, activityIndex: number) {
    this.dispatchEvent(
      new CustomEvent("remove-activity", {
        detail: { dayIndex, activityIndex },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleEditOverview(dayIndex: number) {
    this.dispatchEvent(
      new CustomEvent("edit-overview", {
        detail: { dayIndex },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleEditActivity(dayIndex: number, activityIndex: number) {
    this.dispatchEvent(
      new CustomEvent("edit-activity", {
        detail: { dayIndex, activityIndex },
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    const list: TripDayData[] = this.data ?? this.fetched;

    if (!list || list.length === 0) {
      return html`
        <div class="trip empty-trip">
          <p>No days yet for this trip.</p>
          <button class="btn btn-primary" @click=${this.handleAddDay}>
            <span class="icon-circle">+</span>
            <span>Add first day</span>
          </button>
        </div>
      `;
    }

    return html`
      <div class="trip">
        ${list.map(
          (day, index) => html`
            <div class="trip-day-row">
              <trip-day
                date=${day.date ?? ""}
                location=${day.location ?? ""}
                .activities=${day.activities ?? []}
                .editable=${true}
                @add-activity=${() => this.handleAddActivity(index)}
                @remove-activity=${(e: CustomEvent<{ index: number }>) =>
                  this.handleRemoveActivity(index, e.detail.index)}
                @edit-overview=${() => this.handleEditOverview(index)}
                @edit-activity=${(e: CustomEvent<{ index: number }>) =>
                  this.handleEditActivity(index, e.detail.index)}
              ></trip-day>

              <div class="day-actions">
                <button
                  class="btn btn-ghost btn-danger"
                  @click=${() => this.handleRemoveDay(index)}
                >
                  <span class="icon-circle">−</span>
                  <span>Remove day</span>
                </button>
              </div>
            </div>
          `
        )}

        <div class="trip-controls">
          <button class="btn btn-primary" @click=${this.handleAddDay}>
            <span class="icon-circle">+</span>
            <span>Add day</span>
          </button>
        </div>
      </div>
    `;
  }

  static styles = [reset.styles, page.styles, trippage.styles, listday.styles];
}
