// src/views/trip-complete-view.ts
import { LitElement, html, css } from "lit";
import reset from "../styles/reset.css.ts";
import page from "../styles/page.css.ts";

export class TripCompleteViewElement extends LitElement {
  static styles = [
    reset.styles,
    page.styles,
    css`
      main.confirm-page {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        padding: 2rem;
      }

      .confirm-box {
        background: var(--surface-bg);
        border-radius: 12px;
        padding: 2rem 3rem;
        box-shadow: var(--shadow-md);
        text-align: center;
      }

      .confirm-box h1 {
        margin-bottom: 0.5rem;
      }

      .confirm-actions {
        margin-top: 1.5rem;
        display: flex;
        gap: 1rem;
        justify-content: center;
      }

      .btn {
        padding: 0.5rem 1.25rem;
        border-radius: 999px;
        border: none;
        cursor: pointer;
        font: inherit;
        text-decoration: none;
      }

      .btn-primary {
        background: var(--accent);
        color: white;
      }

      .btn-ghost {
        background: transparent;
        border: 1px solid var(--border-subtle);
        color: var(--text-main);
      }
    `,
  ];

  override render() {
    return html`
      <main class="confirm-page">
        <div class="confirm-box">
          <h1>Complete this trip?</h1>
          <p>
            This is just a placeholder screen. Nothing will actually happen.
          </p>

          <div class="confirm-actions">
            <a href="/app" class="btn btn-primary">Yes</a>
            <a href="/app" class="btn btn-ghost">No</a>
          </div>
        </div>
      </main>
    `;
  }
}
