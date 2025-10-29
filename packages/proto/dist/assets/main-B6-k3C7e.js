import{i as m,a as h,x as l,r as u,p as b,n,b as y,d as k}from"./page.css-C0fZx8p3.js";const w=m`
  .trip-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: var(--surface-bg);
    border-radius: 8px;
    margin-bottom: 1.5rem;
    box-sizing: border-box;
  }

  .subtitle {
    margin: 0.25rem 0 0;
    color: var(--text-muted);
  }
  .exit-link {
    text-decoration: none;
    border: 2px solid var(--acent-primary);
    color: var(--primary);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: 0.2s;
  }
  .exit-link:hover {
    background: var(--acent-primary);
    color: var(--card-bg);
  }

  .home {
    max-width: auto;
    margin: 0 auto;
    padding: 0 1rem 2rem;
  }

  .trip-list {
    background: var(--surface-bg);
    border-radius: var(--radius-md);
    padding: 1rem;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    align-items: stretch;
  }

  .trip-card {
    background: var(--card-bg);
    border-radius: 10px;
    padding: 1rem;
    box-shadow: 0 1px 0 var(--light-bg);
    display: grid;
    grid-template-columns:
      clamp(
        var(--thumb-min) + 120,
        var(--thumb-ideal) + 120,
        var(--thumb-max) + 120
      )
      minmax(0, 1fr);
    grid-template-rows: auto auto;
    gap: 0.75rem 1rem;
    align-items: center;
    border: 1px solid var(--surface-bg);
    height: 100%;
  }

  .thumb {
    inline-size: clamp(var(--thumb-min), var(--thumb-ideal), var(--thumb-max));
    block-size: clamp(var(--thumb-min), var(--thumb-ideal), var(--thumb-max));
    border-radius: 8px;
    overflow: hidden;
    background: var(--surface-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row: 1 / span 2;
  }
  .thumb img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .trip-title {
    margin: 0.5rem;
    font-size: 1rem;
  }
  .actions {
    color: var(--text-color);
    grid-column: 2;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .btn {
    text-decoration: none;
    background: var(--surface-bg);
    color: var(--ink);
    border: 1px solid var(--light-bg);
    padding: 0.45rem 0.8rem;
    border-radius: 8px;
    font-size: 0.95rem;
  }
  .btn:hover {
    background: var(--hover-bg);
  }
  .btn-ghost-danger {
    background: var(--card-bg);
    color: var(--accent-danger);
    border: 1px solid var(--accent-danger);
  }
  .btn-ghost-danger:hover {
    background: var(--hover-danger);
  }

  /* Big CTA */
  .cta-wrap {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
  }
  .cta {
    display: inline-block;
    background: var(--accent-primary);
    color: var(--card-bg);
    text-decoration: none;
    padding: 1rem 2.5rem;
    font-size: 2rem;
    border-radius: 999px;
    box-shadow: 0 6px 18px var(--hover-bg);
  }
  .cta:hover {
    filter: brightness(1.05);
  }

  @media (max-width: 520px) {
    .trip-card {
      grid-template-columns: 56px 1fr;
    }
    .thumb {
      width: 56px;
      height: 56px;
    }
  }

  .dark-mode-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border: 2px solid var(--accent-muted);
    color: var(--text-color);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    text-decoration: none;
    cursor: pointer;
    transition: 0.2s;
    user-select: none;
    background: transparent;
  }

  .dark-mode-toggle:hover {
    background: var(--accent-muted);
    color: var(--header-text-color); /* readable on accent bg */
  }

  .dark-mode-toggle input[type="checkbox"] {
    accent-color: var(--accent-muted);
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
  }
`,v={styles:w};var $=Object.defineProperty,c=(a,e,s,x)=>{for(var r=void 0,i=a.length-1,d;i>=0;i--)(d=a[i])&&(r=d(e,s,r)||r);return r&&$(e,s,r),r};const p=class p extends h{constructor(){super(...arguments),this.imgSrc="images/japan.jpg",this.title="Japan Dec 15 - Dec 19",this.editHref="italy_new.html",this.completeHref="placeholder.html",this.deleteHref="placeholder.html"}render(){return l`
      <article class="trip-card">
        <div class="thumb">
          <img src=${this.imgSrc} alt=${this.title} />
        </div>
        <h3 class="trip-title">${this.title}</h3>
        <div class="actions">
          <a class="btn" href=${this.editHref}>
            Edit trip
            <svg class="icon"><use href="/icons/every.svg#edit"></use></svg>
          </a>
          <a class="btn btn-ghost-danger" href=${this.completeHref}>
            Complete trip
            <svg class="icon"><use href="/icons/every.svg#finish"></use></svg>
          </a>
          <a class="btn btn-ghost-danger" href=${this.deleteHref}>
            Delete Trip
            <svg class="icon"><use href="/icons/every.svg#delete"></use></svg>
          </a>
        </div>
      </article>
    `}};p.styles=[u.styles,b.styles,v.styles,m``];let t=p;c([n({attribute:"img-src"})],t.prototype,"imgSrc");c([n()],t.prototype,"title");c([n({attribute:"edit-href"})],t.prototype,"editHref");c([n({attribute:"complete-href"})],t.prototype,"completeHref");c([n({attribute:"delete-href"})],t.prototype,"deleteHref");customElements.define("trip-card",t);var j=Object.defineProperty,f=(a,e,s,x)=>{for(var r=void 0,i=a.length-1,d;i>=0;i--)(d=a[i])&&(r=d(e,s,r)||r);return r&&j(e,s,r),r};async function H(a){const e=await fetch(a);if(!e.ok)throw new Error(`Failed to fetch ${a}: ${e.status}`);return await e.json()}const g=class g extends h{constructor(){super(...arguments),this.data=[]}connectedCallback(){super.connectedCallback(),this.src&&H(this.src).then(e=>this.data=e).catch(e=>console.error(e))}render(){return this.data.length===0?l``:l`
      <section class="trip-list">
        ${this.data.map(e=>l`
            <trip-card
              img-src=${e.imgSrc}
              title=${e.title}
              edit-href=${e.editHref}
              complete-href=${e.completeHref}
              delete-href=${e.deleteHref}
            ></trip-card>
          `)}
      </section>
    `}};g.styles=[u.styles,b.styles,v.styles,m``];let o=g;f([n()],o.prototype,"src");f([y()],o.prototype,"data");customElements.define("trip-list",o);k({"trip-card":t,"trip-list":o});
