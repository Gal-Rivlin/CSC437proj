// src/styles/auth.css.ts
import { css } from "lit";

const styles = css`
  :host {
    display: block;
  }

  form {
    display: grid;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  /* Primary submit button for auth forms */
  button[type="submit"] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.65rem 1.4rem;
    margin-top: 0.75rem;
    border-radius: 999px;
    border: 1px solid transparent;
    background: var(--accent-primary);
    color: var(--card-bg);
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    box-shadow: 0 8px 18px var(--hover-bg);
    transition: transform 0.1s ease, box-shadow 0.1s ease, filter 0.1s ease,
      background 0.1s ease;
  }

  button[type="submit"]:hover {
    filter: brightness(1.05);
    box-shadow: 0 10px 22px var(--hover-bg);
    transform: translateY(-1px);
  }

  button[type="submit"]:active {
    transform: translateY(0);
    box-shadow: 0 6px 14px var(--hover-bg);
  }
`;

export default { styles };
