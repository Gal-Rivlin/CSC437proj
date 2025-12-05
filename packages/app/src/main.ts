// main.ts
import { Auth, define, History, Switch, Store } from "@calpoly/mustang";
import { html } from "lit";
import { Msg } from "./messages.ts";
import { Model, init } from "./model.ts";
import { NewUserViewElement } from "./views/newuser-view.ts";
import { TripHomeHeaderElement } from "./components/tripHomeHeaderElement";
import { TripHomeElement } from "./components/tripHomeElement";
import { TripHomeElementWrapper } from "./components/tripHomeElementWrapper";
import { HomeViewElement } from "./views/home-view";
import { TripHomeListElement } from "./components/tripHomeListElement.ts";
import { LoginViewElement } from "./views/login-view.ts";
import { LoginFormElement } from "./auth/login-form";
import { TripViewElement } from "./views/trip-view.ts";
import { TripCompleteViewElement } from "./views/trip-complete-view.ts";
import { TripDeleteViewElement } from "./views/trip-delete-view.ts";
import { DayPageElement } from "./components/dayPageElement.ts";
import { ListDayPageElement } from "./components/listDayPageElement.ts";
import { NewTripViewElement } from "./views/new-trip-view.ts";
import update from "./update.ts";

const routes = [
  {
    path: "/app/trip/plan",
    view: () => html`<trip-view></trip-view>`,
  },
  {
    path: "/app/trip/new",
    view: () => html`<new-trip-view></new-trip-view>`,
  },
  {
    path: "/app/trip/complete",
    view: () => html`<trip-complete-view></trip-complete-view>`,
  },
  {
    path: "/app/trip/delete",
    view: () => html`<trip-delete-view></trip-delete-view>`,
  },
  {
    path: "/app/login",
    view: () => html`<login-view></login-view>`,
  },
  {
    path: "/app/newuser",
    view: () => html`<newuser-view></newuser-view>`,
  },
  {
    path: "/app",
    view: () => html`<home-view></home-view>`,
  },
  {
    path: "/",
    redirect: "/app",
  },
];

define({
  // providers
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-store": class AppStore extends Store.Provider<Model, Msg> {
    constructor() {
      super(update, init, "traveling:auth");
    }
  },

  // shared components
  "trip-header": TripHomeHeaderElement,
  "trip-card": TripHomeElement,
  "trip-card-wrapper": TripHomeElementWrapper,
  "trip-list": TripHomeListElement,
  "home-view": HomeViewElement,

  // trip views + day components
  "trip-view": TripViewElement,
  "trip-complete-view": TripCompleteViewElement,
  "trip-delete-view": TripDeleteViewElement,
  "trip-day": DayPageElement,
  "list-day-page": ListDayPageElement,

  "new-trip-view": NewTripViewElement,

  // auth
  "login-view": LoginViewElement,
  "login-form": LoginFormElement,
  "newuser-view": NewUserViewElement,

  // router
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "traveling:history", "traveling:auth");
    }
  },
});
