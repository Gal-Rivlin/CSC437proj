// src/views/trip-view.ts
import { View } from "@calpoly/mustang";
import { html, css } from "lit";
import { state } from "lit/decorators.js";

import reset from "../styles/reset.css.ts";
import page from "../styles/page.css.ts";
import trippage from "../styles/trippage.css.ts";
import modal from "../styles/tripEditModal.css.ts";

import type { Model } from "../model";
import type { Msg } from "../messages";
import type { FullTrip, TripDayData } from "server/models";

type EditKind = "overview" | "activity" | undefined;

export class TripViewElement extends View<Model, Msg> {
  static styles = [
    reset.styles,
    page.styles,
    trippage.styles,
    modal.styles,
    css``,
  ];

  @state() private tripId?: string;
  @state() private localError?: string;

  @state() private editKind: EditKind = undefined;
  @state() private editDayIndex: number = -1;
  @state() private editActivityIndex: number = -1;

  @state() private editDate: string = "";
  @state() private editLocation: string = "";
  @state() private editName: string = "";
  @state() private editDescription: string = "";

  constructor() {
    super("traveling:model");
  }

  override connectedCallback() {
    super.connectedCallback();

    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    if (!id) {
      this.localError = "Missing id in URL.";
      return;
    }

    this.tripId = id;
    this.dispatchMessage(["fulltrip/request", { id }]);
  }

  private get fullTrips(): FullTrip[] {
    return this.model.fullTrips ?? [];
  }

  private get currentFullTrip(): FullTrip | undefined {
    return this.model.currentFullTrip;
  }

  private get trip(): FullTrip | undefined {
    if (!this.tripId) return undefined;

    const targetStr = this.tripId;
    const targetNum = Number(targetStr);
    const targetHasNumber = !Number.isNaN(targetNum);

    if (this.currentFullTrip) {
      const srcId: any =
        (this.currentFullTrip as any).id ?? (this.currentFullTrip as any).Id;
      const srcNum = Number(srcId);
      const srcHasNumber = !Number.isNaN(srcNum);

      if (
        (targetHasNumber && srcHasNumber && srcNum === targetNum) ||
        srcId === targetStr
      ) {
        return this.currentFullTrip;
      }
    }

    return this.fullTrips.find((t: any) => {
      const srcId = t.id ?? t.Id;
      const srcNum = Number(srcId);
      const srcHasNumber = !Number.isNaN(srcNum);

      if (targetHasNumber && srcHasNumber) return srcNum === targetNum;
      return srcId === targetStr;
    });
  }

  private get loading(): boolean {
    if (this.localError) return false;
    return !this.trip && !this.fullTrips.length;
  }

  private get tripDays(): TripDayData[] {
    return this.trip?.data ?? [];
  }

  private onAddDay = () => {
    const trip = this.trip;
    if (!trip) return;

    const existingData = trip.data ?? [];
    const newIndex = existingData.length + 1;

    const newDay: TripDayData = {
      date: `Day ${newIndex}`,
      location: "",
      activities: [],
    };

    const updatedTrip: FullTrip = {
      ...trip,
      data: [...existingData, newDay],
    };

    this.dispatchMessage(["fulltrip/save", { trip: updatedTrip }]);
  };

  private onRemoveDay = (event: CustomEvent<{ index: number }>) => {
    const trip = this.trip;
    if (!trip) return;

    const { index } = event.detail;
    const existingData = trip.data ?? [];
    if (index < 0 || index >= existingData.length) return;

    const updatedData = existingData.filter((_, i) => i !== index);

    const updatedTrip: FullTrip = {
      ...trip,
      data: updatedData,
    };

    this.dispatchMessage(["fulltrip/save", { trip: updatedTrip }]);
  };

  private onAddActivity = (event: CustomEvent<{ dayIndex: number }>) => {
    const trip = this.trip;
    if (!trip) return;

    const { dayIndex } = event.detail;
    const existingData = trip.data ?? [];
    if (dayIndex < 0 || dayIndex >= existingData.length) return;

    const day = existingData[dayIndex];
    const activities = (day.activities ?? []).slice();

    activities.push({
      name: "New activity",
      description: "",
    });

    const updatedDay: TripDayData = {
      ...day,
      activities,
    };

    const updatedData = existingData.slice();
    updatedData[dayIndex] = updatedDay;

    const updatedTrip: FullTrip = {
      ...trip,
      data: updatedData,
    };

    this.dispatchMessage(["fulltrip/save", { trip: updatedTrip }]);
  };

  private onRemoveActivity = (
    event: CustomEvent<{ dayIndex: number; activityIndex: number }>
  ) => {
    const trip = this.trip;
    if (!trip) return;

    const { dayIndex, activityIndex } = event.detail;
    const existingData = trip.data ?? [];
    if (dayIndex < 0 || dayIndex >= existingData.length) return;

    const day = existingData[dayIndex];
    const activities = day.activities ?? [];
    if (activityIndex < 0 || activityIndex >= activities.length) return;

    const updatedActivities = activities.filter((_, i) => i !== activityIndex);

    const updatedDay: TripDayData = {
      ...day,
      activities: updatedActivities,
    };

    const updatedData = existingData.slice();
    updatedData[dayIndex] = updatedDay;

    const updatedTrip: FullTrip = {
      ...trip,
      data: updatedData,
    };

    this.dispatchMessage(["fulltrip/save", { trip: updatedTrip }]);
  };

  private onEditOverview = (event: CustomEvent<{ dayIndex: number }>) => {
    const trip = this.trip;
    if (!trip) return;

    const { dayIndex } = event.detail;
    const day = (trip.data ?? [])[dayIndex];
    if (!day) return;

    this.editKind = "overview";
    this.editDayIndex = dayIndex;
    this.editActivityIndex = -1;
    this.editDate = day.date ?? "";
    this.editLocation = day.location ?? "";
    this.editName = "";
    this.editDescription = "";
  };

  private onEditActivity = (
    event: CustomEvent<{ dayIndex: number; activityIndex: number }>
  ) => {
    const trip = this.trip;
    if (!trip) return;

    const { dayIndex, activityIndex } = event.detail;
    const day = (trip.data ?? [])[dayIndex];
    if (!day || !day.activities) return;

    const act = day.activities[activityIndex];
    if (!act) return;

    this.editKind = "activity";
    this.editDayIndex = dayIndex;
    this.editActivityIndex = activityIndex;
    this.editDate = "";
    this.editLocation = "";
    this.editName = act.name;
    this.editDescription = act.description ?? "";
  };

  private closeEditModal = () => {
    this.editKind = undefined;
    this.editDayIndex = -1;
    this.editActivityIndex = -1;
    this.editDate = "";
    this.editLocation = "";
    this.editName = "";
    this.editDescription = "";
  };

  private saveEdit = () => {
    const trip = this.trip;
    if (!trip || this.editKind === undefined) {
      this.closeEditModal();
      return;
    }

    const existingData = trip.data ?? [];
    const dayIndex = this.editDayIndex;
    if (dayIndex < 0 || dayIndex >= existingData.length) {
      this.closeEditModal();
      return;
    }

    const day = existingData[dayIndex];

    let updatedDay: TripDayData = { ...day };

    if (this.editKind === "overview") {
      updatedDay = {
        ...day,
        date: this.editDate || undefined,
        location: this.editLocation || undefined,
      };
    } else if (this.editKind === "activity") {
      const actIndex = this.editActivityIndex;
      const acts = (day.activities ?? []).slice();
      if (actIndex < 0 || actIndex >= acts.length) {
        this.closeEditModal();
        return;
      }

      acts[actIndex] = {
        ...acts[actIndex],
        name: this.editName || "Untitled",
        description: this.editDescription || "",
      };

      updatedDay = {
        ...day,
        activities: acts,
      };
    }

    const updatedData = existingData.slice();
    updatedData[dayIndex] = updatedDay;

    const updatedTrip: FullTrip = {
      ...trip,
      data: updatedData,
    };

    this.dispatchMessage(["fulltrip/save", { trip: updatedTrip }]);
    this.closeEditModal();
  };

  private renderEditModal() {
    if (!this.editKind) return null;

    const isOverview = this.editKind === "overview";

    return html`
      <div class="edit-overlay" @click=${this.closeEditModal}>
        <div class="edit-dialog" @click=${(e: Event) => e.stopPropagation()}>
          <h2>${isOverview ? "Edit day" : "Edit activity"}</h2>
          <p>
            ${isOverview
              ? "Update the date and location for this day."
              : "Update the name and description for this activity."}
          </p>

          ${isOverview
            ? html`
                <div class="edit-field">
                  <label for="edit-date">Date / label</label>
                  <input
                    id="edit-date"
                    .value=${this.editDate}
                    @input=${(e: Event) =>
                      (this.editDate = (e.target as HTMLInputElement).value)}
                  />
                </div>
                <div class="edit-field">
                  <label for="edit-location">Location</label>
                  <input
                    id="edit-location"
                    .value=${this.editLocation}
                    @input=${(e: Event) =>
                      (this.editLocation = (
                        e.target as HTMLInputElement
                      ).value)}
                  />
                </div>
              `
            : html`
                <div class="edit-field">
                  <label for="edit-name">Activity name</label>
                  <input
                    id="edit-name"
                    .value=${this.editName}
                    @input=${(e: Event) =>
                      (this.editName = (e.target as HTMLInputElement).value)}
                  />
                </div>
                <div class="edit-field">
                  <label for="edit-desc">Description</label>
                  <textarea
                    id="edit-desc"
                    rows="3"
                    .value=${this.editDescription}
                    @input=${(e: Event) =>
                      (this.editDescription = (
                        e.target as HTMLTextAreaElement
                      ).value)}
                  ></textarea>
                </div>
              `}

          <div class="edit-actions">
            <button class="btn-modal btn-cancel" @click=${this.closeEditModal}>
              Cancel
            </button>
            <button class="btn-modal btn-save" @click=${this.saveEdit}>
              Save
            </button>
          </div>
        </div>
      </div>
    `;
  }

  override render() {
    if (this.localError) {
      return html`<main class="trip-page"><p>${this.localError}</p></main>`;
    }

    if (!this.tripId) {
      return html`<main class="trip-page"><p>Missing trip id.</p></main>`;
    }

    if (this.loading) {
      return html`<main class="trip-page"><p>Loading trip...</p></main>`;
    }

    const trip = this.trip;

    if (!trip) {
      return html`
        <main class="trip-page">
          <header class="trip-header">
            <h1>Trip not found</h1>
            <label class="dark-mode-toggle"></label>
            <a href="/app" class="exit-link">Exit to Menu</a>
          </header>

          <section>
            <p>No FullTrip with id "${this.tripId}" was found.</p>
          </section>
        </main>
      `;
    }

    return html`
      <main class="trip-page">
        <header class="trip-header">
          <h1>${trip.name}</h1>
          <label class="dark-mode-toggle"></label>
          <a href="/app" class="exit-link">Exit to Menu</a>
        </header>

        <list-day-page
          .data=${this.tripDays}
          @add-day=${this.onAddDay}
          @remove-day=${this.onRemoveDay}
          @add-activity=${this.onAddActivity}
          @remove-activity=${this.onRemoveActivity}
          @edit-overview=${this.onEditOverview}
          @edit-activity=${this.onEditActivity}
        ></list-day-page>

        ${this.renderEditModal()}
      </main>
    `;
  }
}
