// src/views/login-view.ts
import { html, LitElement } from "lit";

import reset from "../styles/reset.css.ts";
import page from "../styles/page.css.ts";
import login from "../styles/login.css.ts";

export class LoginViewElement extends LitElement {
  static styles = [reset.styles, page.styles, login.styles];

  override render() {
    return html`
      <main class="login-page">
        <section class="auth-card">
          <h2 class="auth-title">Sign in</h2>
          <p class="auth-subtitle">
            Welcome back! Enter your credentials to access your trips.
          </p>

          <login-form api="/auth/login">
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
          </login-form>

          <p class="auth-footer">
            New here?
            <a href="/app/newuser">Sign up as a new user</a>
          </p>
        </section>
      </main>
    `;
  }
}
