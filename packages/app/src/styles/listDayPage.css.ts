// src/styles/listDayPage.css.ts
import { css } from "lit";

export default {
  styles: css`
    .trip {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .trip-day-row {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      padding: 1rem;
      border-radius: var(--radius-md);
      background: var(--card-bg);
      border: 1px solid var(--surface-bg);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
      transition: background 0.2s ease, border-color 0.2s ease;
    }

    .trip-day-row:hover {
      background: var(--hover-bg);
    }

    .day-actions {
      margin-left: auto;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .btn {
      font: inherit;
      padding: 0.45rem 1rem;
      border-radius: var(--radius-lg);
      cursor: pointer;
      border: 1px solid transparent;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      transition: background 0.15s ease, border-color 0.15s ease,
        box-shadow 0.15s ease, transform 0.07s ease;
      user-select: none;
    }

    .btn:active {
      transform: translateY(1px);
    }

    .btn-primary {
      background: var(--accent-primary);
      color: #fff;
      border-color: var(--accent-primary);
      box-shadow: 0 4px 12px rgba(94, 74, 227, 0.35);
    }

    .btn-primary:hover {
      filter: brightness(0.92);
      box-shadow: 0 2px 10px rgba(94, 74, 227, 0.4);
    }

    .btn-ghost {
      background: transparent;
      color: var(--text-muted);
      border-color: var(--accent-muted);
    }

    .btn-ghost:hover {
      background: var(--hover-bg);
      border-color: var(--text-muted);
    }
    .btn-danger {
      color: var(--accent-danger);
      border-color: var(--accent-danger);
    }

    .btn-danger:hover {
      background: var(--hover-danger);
      border-color: var(--accent-danger);
    }

    .trip-controls {
      margin-top: 0.75rem;
      display: flex;
      justify-content: flex-end;
    }
    .empty-trip {
      padding: 1.25rem 1.5rem;
      border-radius: var(--radius-md);
      border: 2px dashed var(--accent-muted);
      background: var(--light-bg);
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: var(--text-muted);
    }

    .icon-circle {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 999px;
      border: 2px solid currentColor;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: bold;
    }
  `,
};
