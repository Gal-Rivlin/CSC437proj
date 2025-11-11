import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import type { TripCardData } from "./types.ts";
import reset from "./styles/reset.css.ts";
import page from "./styles/page.css.ts";
import homepage from "./styles/homepage.css.ts";
import { Auth, Observer } from "@calpoly/mustang";

export async function hydrate(
  src: string,
  headers?: HeadersInit
): Promise<TripCardData[]> {
  const res = await fetch(src, { headers });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${src}: ${res.status}`);
  }
  const json = await res.json();
  return json as TripCardData[];
}

export class TripHomeListElement extends LitElement {
  @property({ type: String }) src = "/api/tripcards";
  @state() data: TripCardData[] = [];

  _authObserver = new Observer<Auth.Model>(this, "traveling:auth");
  _user?: Auth.User;

  /**
   * Purpose: generate the appropriate HTTP header for making authenticated requests.
   * Usage:
   *   fetch(url, { headers: this.authorization }).then((res) => {
   *     // handle the response
   *   });
   */
  get authorization() {
    return (
      this._user?.authenticated && {
        Authorization: `Bearer ${(this._user as Auth.AuthenticatedUser).token}`,
      }
    );
  }

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      this._user = auth.user;
      this.load(); // reload if auth state changes
    });
    this.load(); // initial load
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("src")) this.load();
  }

  private async load() {
    if (!this.src) return;
    try {
      const data = await hydrate(this.src, this.authorization as HeadersInit);
      this.data = data;
    } catch (err) {
      console.error(err);
      this.data = [];
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
