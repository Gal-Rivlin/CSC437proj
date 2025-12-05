// src/styles/tripEditModal.css.ts
import { css } from "lit";

export default {
  styles: css`
    .edit-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .edit-dialog {
      min-width: 280px;
      max-width: 420px;
      width: 100%;
      padding: 1.25rem 1.5rem;
      border-radius: var(--radius-md);
      background: var(--card-bg);
      box-shadow: 0 18px 45px rgba(0, 0, 0, 0.35);
      color: var(--text-color);
    }

    .edit-dialog h2 {
      margin: 0 0 0.75rem 0;
      font-size: 1.1rem;
    }

    .edit-dialog p {
      margin: 0 0 1rem 0;
      font-size: 0.9rem;
      color: var(--text-muted);
    }

    .edit-field {
      margin-bottom: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .edit-field label {
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .edit-field input,
    .edit-field textarea {
      font: inherit;
      padding: 0.4rem 0.55rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--surface-bg);
      background: var(--light-bg);
      color: var(--text-color);
      resize: vertical;
    }

    .edit-field input:focus,
    .edit-field textarea:focus {
      outline: none;
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 1px var(--accent-primary);
      background: var(--card-bg);
    }

    .edit-actions {
      margin-top: 0.75rem;
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }

    .btn-modal {
      font: inherit;
      font-size: 0.8rem;
      padding: 0.35rem 0.8rem;
      border-radius: var(--radius-sm);
      border: 1px solid transparent;
      cursor: pointer;
      transition: background 0.15s ease, border-color 0.15s ease,
        color 0.15s ease, transform 0.07s ease;
    }

    .btn-modal:active {
      transform: translateY(1px);
    }

    .btn-cancel {
      background: transparent;
      color: var(--text-muted);
      border-color: var(--accent-muted);
    }

    .btn-cancel:hover {
      background: var(--hover-bg);
      color: var(--text-color);
    }

    .btn-save {
      background: var(--accent-primary);
      color: #fff;
      border-color: var(--accent-primary);
    }

    .btn-save:hover {
      filter: brightness(0.92);
    }
  `,
};
