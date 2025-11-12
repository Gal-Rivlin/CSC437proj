import{i as u,a as b,x as d,r as v,n as c,O as w,b as g,e as O,d as S,c as j}from"./reset.css-BESqzo9z.js";import{p as f}from"./page.css-bvP4R-uf.js";const z=u`
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
`,y={styles:z};var C=Object.defineProperty,h=(a,e,r,m)=>{for(var t=void 0,s=a.length-1,n;s>=0;s--)(n=a[s])&&(t=n(e,r,t)||t);return t&&C(e,r,t),t};const x=class x extends b{constructor(){super(...arguments),this.imgSrc="images/japan.jpg",this.title="Japan Dec 15 - Dec 19",this.editHref="italy_new.html",this.completeHref="placeholder.html",this.deleteHref="placeholder.html"}render(){return d`
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
    `}};x.styles=[v.styles,f.styles,y.styles,u``];let i=x;h([c({attribute:"img-src"})],i.prototype,"imgSrc");h([c()],i.prototype,"title");h([c({attribute:"edit-href"})],i.prototype,"editHref");h([c({attribute:"complete-href"})],i.prototype,"completeHref");h([c({attribute:"delete-href"})],i.prototype,"deleteHref");customElements.define("trip-card",i);var I=Object.defineProperty,_=(a,e,r,m)=>{for(var t=void 0,s=a.length-1,n;s>=0;s--)(n=a[s])&&(t=n(e,r,t)||t);return t&&I(e,r,t),t};async function P(a,e){const r=await fetch(a,{headers:e});if(!r.ok)throw new Error(`Failed to fetch ${a}: ${r.status}`);return await r.json()}const k=class k extends b{constructor(){super(...arguments),this.src="/api/tripcards",this.data=[],this._authObserver=new w(this,"traveling:auth")}get authorization(){return this._user?.authenticated&&{Authorization:`Bearer ${this._user.token}`}}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this.load()}),this.load()}updated(e){e.has("src")&&this.load()}async load(){if(this.src)try{const e=await P(this.src,this.authorization);this.data=e}catch(e){console.error(e),this.data=[]}}render(){return this.data.length===0?d``:d`
      <section class="trip-list">
        ${this.data.map(e=>d`
            <trip-card
              img-src=${e.imgSrc}
              title=${e.title}
              edit-href=${e.editHref}
              complete-href=${e.completeHref}
              delete-href=${e.deleteHref}
            ></trip-card>
          `)}
      </section>
    `}};k.styles=[v.styles,f.styles,y.styles,u``];let l=k;_([c({type:String})],l.prototype,"src");_([g()],l.prototype,"data");customElements.define("trip-list",l);var B=Object.defineProperty,p=(a,e,r,m)=>{for(var t=void 0,s=a.length-1,n;s>=0;s--)(n=a[s])&&(t=n(e,r,t)||t);return t&&B(e,r,t),t};const $=class $ extends b{constructor(){super(...arguments),this.checked=!1,this._authObserver=new w(this,"traveling:auth"),this.loggedIn=!1}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{const{user:r}=e;r&&r.authenticated?(this.loggedIn=!0,this.userid=r.username):(this.loggedIn=!1,this.userid=void 0)})}firstUpdated(){const e=sessionStorage.getItem("theme");this.checked=e==="dark"}onToggle(e){const r=e.target.checked;this.checked=r,this.dispatchEvent(new CustomEvent("darkmode:toggle",{bubbles:!0,composed:!0,detail:{checked:r}}))}renderSignOutButton(){return d`
      <button
        @click=${e=>{O.relay(e,"auth:message",["auth/signout"])}}
      >
        Sign Out
      </button>
    `}renderSignInButton(){return d` <a href="/login.html"> Sign In… </a> `}render(){return d`
      <header class="trip-header">
        <div class="header-left">
          <h1>My Trips</h1>
          <p class="subtitle">Where to, ${this.userid||"traveler"}?</p>
          ${this.loggedIn?this.renderSignOutButton():this.renderSignInButton()}
        </div>
        <label class="dark-mode-toggle">
          <input
            type="checkbox"
            autocomplete="off"
            .checked=${this.checked}
            @change=${this.onToggle}
          />
          Dark mode
        </label>
      </header>
    `}};$.styles=[v.styles,f.styles,y.styles,u``];let o=$;p([c({type:String})],o.prototype,"src");p([g()],o.prototype,"checked");p([g()],o.prototype,"loggedIn");p([g()],o.prototype,"userid");customElements.define("trip-header",o);S({"trip-header":o,"trip-card":i,"trip-list":l,"mu-auth":j.Provider});o.initializeOnce();
