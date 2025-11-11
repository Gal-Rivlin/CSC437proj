import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";
import page from "./styles/page.css.ts";
import homepage from "./styles/homepage.css.ts";
import { Auth, Events, Observer } from "@calpoly/mustang";

export class TripHomeHeaderElement extends LitElement {
  @property({ type: String }) src?: string;
  @state() private checked = false;

  _authObserver = new Observer<Auth.Model>(this, "traveling:auth");

  @state()
  loggedIn = false;

  @state()
  userid?: string;

  connectedCallback() {
    super.connectedCallback();

    this._authObserver.observe((auth: Auth.Model) => {
      const { user } = auth;

      if (user && user.authenticated) {
        this.loggedIn = true;
        this.userid = user.username;
      } else {
        this.loggedIn = false;
        this.userid = undefined;
      }
    });
  }

  // Read saved theme and set checkbox state
  protected firstUpdated() {
    const saved = sessionStorage.getItem("theme");
    this.checked = saved === "dark";
  }

  private onToggle(e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    this.checked = checked;

    // IMPORTANT: composed:true lets the event escape shadow DOM
    this.dispatchEvent(
      new CustomEvent("darkmode:toggle", {
        bubbles: true,
        composed: true,
        detail: { checked },
      })
    );
  }

  renderSignOutButton() {
    return html`
      <button
        @click=${(e: UIEvent) => {
          Events.relay(e, "auth:message", ["auth/signout"]);
        }}
      >
        Sign Out
      </button>
    `;
  }

  renderSignInButton() {
    return html` <a href="/login.html"> Sign In… </a> `;
  }

  override render() {
    return html`
      <header class="trip-header">
        <div class="header-left">
          <h1>My Trips</h1>
          <p class="subtitle">Where to, ${this.userid || "traveler"}?</p>
          ${this.loggedIn
            ? this.renderSignOutButton()
            : this.renderSignInButton()}
        </div>
        <label class="dark-mode-toggle">
          <input
            type="checkbox"
            autocomplete="off"
            .checked=${this.checked}
            @change=${this.onToggle}
          />
          Dark mode
        </label>
      </header>
    `;
  }

  static styles = [reset.styles, page.styles, homepage.styles, css``];
}

customElements.define("trip-header", TripHomeHeaderElement);
