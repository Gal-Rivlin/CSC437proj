import { css } from "lit";

const styles = css`
  /* Layout for the create-trip page */
  .new-trip-page {
    max-width: 720px;
    margin: 0 auto;
    padding: 1.5rem 1.5rem 3rem;
  }

  /* Card container */
  .new-trip-card {
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    background: var(--card-bg);
    box-shadow: 0 10px 30px var(--light-bg);
    border: 1px solid var(--surface-bg);
  }

  .new-trip-card h2 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: var(--text-muted);
  }

  .field-group {
    display: grid;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  label {
    display: grid;
    gap: 0.35rem;
    font-size: 0.9rem;
    color: var(--text-color);
  }

  input,
  textarea {
    border-radius: var(--radius-md);
    border: 1px solid var(--surface-bg);
    padding: 0.55rem 0.75rem;
    font: inherit;
    background: var(--card-bg);
    color: var(--text-color);
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }

  input::placeholder,
  textarea::placeholder {
    color: var(--text-muted);
  }

  .new-trip-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: flex-end;
    margin-top: 1rem;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    padding: 0.65rem 1.3rem;
    border-radius: 999px;
    font-size: 0.95rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    border: 1px solid transparent;
    transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.1s ease,
      border-color 0.1s ease;
  }

  .btn-primary {
    background: var(--accent-primary);
    color: var(--card-bg);
    box-shadow: 0 8px 18px var(--hover-bg);
  }

  .btn-primary:hover {
    filter: brightness(1.05);
    box-shadow: 0 10px 22px var(--hover-bg);
    transform: translateY(-1px);
  }

  .btn-secondary {
    background: transparent;
    color: var(--text-color);
    border-color: var(--accent-muted);
  }

  .btn-secondary:hover {
    background: var(--hover-bg);
  }

  h3 {
    font-size: 1rem;
    margin: 1.2rem 0 0.5rem;
    color: var(--text-muted);
  }

  .image-picker {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 0.75rem;
    margin-top: 0.75rem;
  }

  .image-option {
    padding: 0;
    border: 2px solid transparent;
    border-radius: var(--radius-md);
    background: var(--card-bg);
    cursor: pointer;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: border-color 0.15s ease, transform 0.15s ease,
      box-shadow 0.15s ease;
  }

  .image-option img {
    width: 100%;
    height: 70px;
    object-fit: cover;
    display: block;
  }

  .image-option span {
    font-size: 0.75rem;
    padding: 0.25rem 0;
    color: var(--text-muted);
  }

  .image-option:hover {
    transform: scale(1.03);
  }

  .image-option.selected {
    border-color: var(--accent-primary);
    box-shadow: 0 0 10px var(--hover-bg);
  }

  @media (max-width: 520px) {
    .new-trip-page {
      padding: 1rem 1rem 2rem;
    }

    .image-picker {
      grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    }

    .image-option img {
      height: 60px;
    }
  }
`;

export default { styles };
