// src/views/newuser-view.ts
import { html } from "lit";
import { View, Form, define } from "@calpoly/mustang";
import type { Model } from "../model";
import type { Msg } from "../messages";

import reset from "../styles/reset.css.ts";
import page from "../styles/page.css.ts";
import login from "../styles/login.css.ts";

export class NewUserViewElement extends View<Model, Msg> {
  constructor() {
    super("traveling:model");
  }

  static uses = define({
    "mu-form": Form.Element,
  });

  static styles = [reset.styles, page.styles, login.styles];
  handleSubmit(
    event: Form.SubmitEvent<{ username: string; password: string }>
  ) {
    const { username, password } = event.detail;

    this.dispatchMessage([
      "user/register",
      { username, password },
      {
        onSuccess: () => {
          const token = sessionStorage.getItem("signup-token");
          if (!token) {
            console.error("No signup token found in sessionStorage");
            return;
          }
          const customEvent = new CustomEvent("auth:message", {
            bubbles: true,
            composed: true,
            detail: ["auth/signin", { token, redirect: "/app" }],
          });
          this.dispatchEvent(customEvent);

          sessionStorage.removeItem("signup-token");
        },
        onFailure: (error: Error) => console.log("Registration failed:", error),
      },
    ]);
  }
  override render() {
    return html`
      <main class="login-page">
        <section class="auth-card">
          <h2 class="auth-title">Create an account</h2>
          <p class="auth-subtitle">
            Set up a new account to start planning your trips.
          </p>

          <!-- Lab 15: Use mu-form instead of <login-form> -->
          <mu-form @mu-form:submit=${this.handleSubmit}>
            <label>
              <span>Username</span>
              <input
                name="username"
                autocomplete="off"
                placeholder="yourname"
              />
            </label>

            <label>
              <span>Password</span>
              <input type="password" name="password" placeholder="••••••••" />
            </label>
          </mu-form>

          <p class="auth-footer">
            Already have an account?
            <a href="/app/login">Sign in</a>
          </p>
        </section>
      </main>
    `;
  }
}
