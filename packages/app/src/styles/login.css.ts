// src/styles/login.css.ts
import { css } from "lit";

const styles = css`
  .login-page {
    min-height: calc(100vh - 4rem);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1.5rem;
    box-sizing: border-box;
  }

  .auth-card {
    width: 100%;
    max-width: 420px;
    background: var(--card-bg);
    border-radius: var(--radius-lg);
    padding: 2rem 2rem 1.75rem;
    box-shadow: 0 10px 30px var(--light-bg);
    border: 1px solid var(--surface-bg);
  }

  .auth-title {
    margin: 0 0 0.35rem;
    font-size: 1.5rem;
    color: var(--text-color);
  }

  .auth-subtitle {
    margin: 0 0 1.5rem;
    color: var(--text-muted);
    font-size: 0.95rem;
  }

  login-form,
  mu-form {
    display: block;
  }

  label {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0.35rem;
    margin-bottom: 0.85rem;
    font-size: 0.9rem;
    color: var(--text-color);
  }

  label span {
    font-weight: 500;
  }

  input {
    border-radius: var(--radius-md);
    border: 1px solid var(--surface-bg);
    padding: 0.55rem 0.75rem;
    font: inherit;
    background: var(--card-bg);
    color: var(--text-color);
  }

  input::placeholder {
    color: var(--text-muted);
  }

  .auth-footer {
    margin-top: 1.25rem;
    font-size: 0.9rem;
    color: var(--text-muted);
    text-align: center;
  }

  .auth-footer a {
    color: var(--accent-primary);
    text-decoration: none;
    font-weight: 600;
  }

  .auth-footer a:hover {
    text-decoration: underline;
  }

  login-form button,
  login-form input[type="submit"],
  mu-form button[type="submit"],
  mu-form input[type="submit"] {
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

  login-form button:hover,
  login-form input[type="submit"]:hover,
  mu-form button[type="submit"]:hover,
  mu-form input[type="submit"]:hover {
    filter: brightness(1.05);
    box-shadow: 0 10px 22px var(--hover-bg);
    transform: translateY(-1px);
  }

  login-form button:active,
  login-form input[type="submit"]:active,
  mu-form button[type="submit"]:active,
  mu-form input[type="submit"]:active {
    transform: translateY(0);
    box-shadow: 0 6px 14px var(--hover-bg);
  }
`;

export default { styles };
