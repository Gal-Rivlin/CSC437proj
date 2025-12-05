// src/styles/dayPage.css.ts
import { css } from "lit";

export default {
  styles: css`
    :host {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      margin-bottom: 1rem;
      background: var(--surface-bg);
      border-radius: var(--radius-md);
      align-items: stretch;
      box-sizing: border-box;
      overflow-x: auto;
    }

    :host > div {
      margin-right: 0.5rem;
      color: var(--text-color);
      flex: 0 0 auto;
      padding: 0.9rem 1rem;
      background: var(--card-bg);
      border-radius: var(--radius-sm);
      min-width: 160px;
      max-width: 260px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    }

    .day-overview {
      border-left: 3px solid var(--accent-primary);
    }

    .day-label {
      margin: 0 0 0.25rem 0;
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--accent-primary);
    }

    .day-location {
      margin: 0;
      font-weight: 500;
    }

    .day-location--empty {
      color: var(--text-muted);
      font-style: italic;
    }

    .activity-card {
      border-left: 3px solid var(--accent-muted);
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .activity-name {
      margin: 0;
      font-weight: 600;
      font-size: 0.95rem;
    }

    .activity-desc {
      margin: 0;
      font-size: 0.9rem;
      color: var(--text-muted);
    }

    .activity-desc--empty {
      font-style: italic;
    }

    .activity-actions {
      margin-top: 0.25rem;
      display: flex;
      justify-content: flex-end;
    }

    /* Smaller buttons */
    .activity-remove-btn,
    .activity-add-btn {
      font: inherit;
      font-size: 0.75rem; /* SMALLER TEXT */
      padding: 0.15rem 0.45rem; /* SMALLER PADDING */
      border-radius: var(--radius-sm);
      border: 1px solid var(--accent-muted);
      background: transparent;
      color: var(--text-muted);
      cursor: pointer;
      line-height: 1;
      transition: background 0.15s ease, border-color 0.15s ease,
        color 0.15s ease, transform 0.07s ease;
    }

    .activity-remove-btn {
      color: var(--accent-danger);
      border-color: var(--accent-danger);
    }

    .activity-remove-btn:hover {
      background: var(--hover-danger);
    }

    .activity-add-btn {
      margin-top: 0.4rem;
      align-self: flex-start;
      border-color: var(--accent-primary);
      color: var(--accent-primary);
    }

    .activity-add-btn:hover {
      background: var(--hover-bg);
    }

    .activity-remove-btn:active,
    .activity-add-btn:active {
      transform: translateY(1px);
    }
  `,
};
