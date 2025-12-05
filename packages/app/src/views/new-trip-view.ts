// src/views/new-trip-view.ts
import { html } from "lit";
import { View } from "@calpoly/mustang";
import { state } from "lit/decorators.js";

import reset from "../styles/reset.css.ts";
import page from "../styles/page.css.ts";
import trippage from "../styles/trippage.css.ts";
import newtrip from "../styles/newtrip.css.ts";

import type { Model } from "../model";
import type { Msg } from "../messages";
import type { TripCardData } from "server/models";

// 🔹 All sample images available in /images/
const SAMPLE_IMAGES: { src: string; label: string }[] = [
  { src: "/images/australia.jpg", label: "australia" },
  { src: "/images/bolivia.jpg", label: "bolivia" },
  { src: "/images/budapest.jpg", label: "Budapest" },
  { src: "/images/bunny.jpg", label: "Bunny" },
  { src: "/images/chile.jpg", label: "Chile" },
  { src: "/images/cliffs.jpg", label: "Cliffs" },
  { src: "/images/Croatia.JPG", label: "Croatia" },
  { src: "/images/Easter.jpg", label: "Easter Island" },
  { src: "/images/elpahant2.jpg", label: "Elephant" },
  { src: "/images/england.jpg", label: "England" },
  { src: "/images/england2.jpg", label: "England 2" },
  { src: "/images/greece.jpg", label: "Greece" },
  { src: "/images/india.jpg", label: "India" },
  { src: "/images/indonesia.jpg", label: "Indonesia" },
  { src: "/images/ireland.jpg", label: "Ireland" },
  { src: "/images/israel.jpg", label: "Israel" },
  { src: "/images/italy.JPG", label: "Italy" },
  { src: "/images/japan.jpg", label: "Japan" },
  { src: "/images/Malta.JPG", label: "Malta" },
  { src: "/images/montana.jpg", label: "Montana" },
  { src: "/images/newZealand.png", label: "New Zealand" },
  { src: "/images/Nice.jpg", label: "Nice" },
  { src: "/images/oxford.JPG", label: "Oxford" },
  { src: "/images/paris.jpg", label: "Paris" },
  { src: "/images/pisa.jpg", label: "Pisa" },
  { src: "/images/SanChristobal.jpg", label: "San Cristóbal" },
  { src: "/images/ski.jpg", label: "Ski" },
  { src: "/images/Spain.jpg", label: "Spain" },
  { src: "/images/uganda.JPG", label: "Uganda" },
];

export class NewTripViewElement extends View<Model, Msg> {
  static styles = [reset.styles, page.styles, trippage.styles, newtrip.styles];

  constructor() {
    super("traveling:model");
  }

  @state()
  private selectedImage: string | null = null;

  private handleSelectImage(src: string) {
    this.selectedImage = src;
  }

  private handleSubmit(e: Event) {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);

    const title = (data.get("title") || "").toString().trim();
    const id = (
      window.crypto && "randomUUID" in window.crypto
        ? (window.crypto as any).randomUUID()
        : Date.now().toString()
    ) as string;

    const imgSrc = this.selectedImage || "/images/england.jpg";

    const newTrip: TripCardData = {
      id,
      title: title || "Untitled Trip",
      imgSrc,
      editHref: "/app/trip/plan?id=" + id,
      completeHref: "/app/trip/complete?id=" + id,
      deleteHref: "/app/trip/delete?id=" + id,
    };

    this.dispatchMessage([
      "tripcard/create",
      { trip: newTrip },
      {
        onSuccess: () => {
          window.location.assign("/app");
        },
        onFailure: (err) => {
          console.error("Failed to create trip:", err);
          alert("Sorry, something went wrong creating this trip.");
        },
      },
    ]);
  }

  override render() {
    return html`
      <main class="trip-page new-trip-page">
        <section class="new-trip-card">
          <h2>Basic Details</h2>

          <form @submit=${this.handleSubmit}>
            <div class="field-group">
              <label>
                Trip Title
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Italy - Dec 15-22 (include dates here)"
                  required
                />
                <small>
                  Please include destination + dates in the title. (Example:
                  “Italy - Dec 15-22”)
                </small>
              </label>
            </div>

            <h3>Choose a Cover Image</h3>
            <div class="image-picker">
              ${SAMPLE_IMAGES.map(
                (img) => html`
                  <button
                    type="button"
                    class="image-option ${this.selectedImage === img.src
                      ? "selected"
                      : ""}"
                    @click=${() => this.handleSelectImage(img.src)}
                  >
                    <img src=${img.src} alt=${img.label} />
                  </button>
                `
              )}
            </div>

            <div class="new-trip-actions">
              <button type="submit" class="btn btn-primary">Create Trip</button>
              <a href="/app" class="btn btn-secondary">Cancel</a>
            </div>
          </form>
        </section>
      </main>
    `;
  }
}
