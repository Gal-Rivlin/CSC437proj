import{i as h,a as u,x as o,r as f,n as p,b as y,d as k}from"./reset.css-BESqzo9z.js";import{p as m}from"./page.css-bvP4R-uf.js";const w=h`
  .trip {
    display: grid;
    gap: 1rem;
  }

  .trip-day {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    margin-bottom: 1rem;
    background: var(--surface-bg);
    border-radius: 8px;
    align-items: stretch;
    box-sizing: border-box;
    height: 200px;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    box-sizing: border-box;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .trip-day > div {
    color: var(--light-text);
    flex: 0 0 auto;
    height: auto;
    padding: 1rem;
    align-self: stretch;
    background: var(--card-bg);
    padding: 1rem;
    border-radius: 6px;
    min-width: 150px;
  }
  .trip-day > button {
    align-self: center;
  }
  .photos {
    min-width: 150px;
    align-self: center;
  }

  .date {
    font-weight: bold;
    color: var(--light-text);
  }

  .add-btn {
    background: none;
    border: 2px solid var(--accent-primary);
    color: var(--accent-primary);
    font-size: 1.5rem;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }

  .add-btn:hover {
    background: var(--accent-primary);
    color: var(--card-bg);
  }

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

  .exit-link {
    text-decoration: none;
    background: none;
    border: 2px solid var(--accent-primary);
    color: var(--accent-primary);
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .exit-link:hover {
    background: var(--accent-primary);
    color: var(--card-bg);
  }
`,v={styles:w};var $=Object.defineProperty,c=(a,t,s,e)=>{for(var r=void 0,n=a.length-1,l;n>=0;n--)(l=a[n])&&(r=l(t,s,r)||r);return r&&$(t,s,r),r};const g=class g extends u{render(){const t=this.bookings?this.bookings.split(",").map(e=>e.trim()).filter(Boolean):[],s=this.photos?this.photos.split(",").map(e=>e.trim()).filter(Boolean):[];return o`
      ${this.date||this.location?o`
            <div class="date">
              ${this.date?o`<p>${this.date}</p>`:null}
              ${this.location?o`<p>${this.location}</p>`:null}
            </div>
          `:null}

      <!-- ITINERARY SECTION -->
      ${this.itinerary?o`
            <div class="itinerary">
              <h4>Itinerary (tentative planning)</h4>
              <p>${this.itinerary}</p>
            </div>
          `:null}

      <!-- BOOKINGS SECTION -->
      ${this.bookings?o`
            <div class="bookings">
              <h4>Bookings</h4>
              ${t.map(e=>o`<p>${e}</p>`)}
            </div>
          `:null}

      <!-- PHOTOS SECTION -->
      ${this.photos?o`
            <div class="photos">
              <div class="photo-card">
                <strong>Photos</strong><br />
                ${s.map(e=>o`<a href=${e} target="_blank">click for photos</a>`)}
              </div>
            </div>
          `:null}

      <button class="add-btn" aria-label="Add photo">+</button>
    `}};g.styles=[f.styles,m.styles,v.styles,h`
      :host {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        margin-bottom: 1rem;
        background: var(--surface-bg);
        border-radius: 8px;
        align-items: stretch;
        box-sizing: border-box;
        height: 200px;
        flex-wrap: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        box-sizing: border-box;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      :host > div {
        margin-right: 1rem;
        color: var(--light-text);
        flex: 0 0 auto;
        height: auto;
        padding: 1rem;
        align-self: stretch;
        background: var(--card-bg);
        padding: 1rem;
        border-radius: 6px;
        min-width: 150px;
      }
      :host > button {
        align-self: center;
      }
    `];let i=g;c([p()],i.prototype,"date");c([p()],i.prototype,"location");c([p()],i.prototype,"itinerary");c([p()],i.prototype,"bookings");c([p()],i.prototype,"photos");customElements.define("trip-day",i);var O=Object.defineProperty,x=(a,t,s,e)=>{for(var r=void 0,n=a.length-1,l;n>=0;n--)(l=a[n])&&(r=l(t,s,r)||r);return r&&O(t,s,r),r};async function z(a){const t=await fetch(a);if(!t.ok)throw new Error(`Failed to fetch ${a}: ${t.status}`);return await t.json()}const b=class b extends u{constructor(){super(...arguments),this.data=[]}connectedCallback(){super.connectedCallback(),this.src&&z(this.src).then(t=>this.data=t).catch(t=>console.error(t))}render(){return this.data.length===0?o``:o` <div class="trip">
      ${this.data.map(t=>o`
          <trip-day
            date=${t.date}
            location=${t.location}
            itinerary=${t.itinerary}
            bookings=${t.bookings}
            photos=${t.photos}
          ></trip-day>
        `)}
    </div>`}};b.styles=[f.styles,m.styles,v.styles,h``];let d=b;x([p()],d.prototype,"src");x([y()],d.prototype,"data");customElements.define("list-day-page",d);k({"trip-day":i,"list-day-page":d});
