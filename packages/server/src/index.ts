import express, { Request, Response } from "express";
import fs from "node:fs/promises";
import path from "path";
import { connect } from "./services/mongo";
import TripCards from "./services/tripCardData-svc";
import TripCardRouter from "./routes/tripcards";
import auth, { authenticateUser } from "./routes/auth";

import FullTripRouter from "./routes/fulltrip";

connect("traveling");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = path.resolve(process.cwd(), process.env.STATIC || "public");

app.use(express.json());
app.use(express.static(staticDir));

app.use("/api/tripcards", authenticateUser, TripCardRouter);

app.use("/api/fulltrip", authenticateUser, FullTripRouter);

app.use("/auth", auth);

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) => res.send(html));
});

app.get("/tripcards/:tripID", (req: Request, res: Response) => {
  const { tripID } = req.params;

  TripCards.get(tripID).then((data) => {
    if (data) {
      res.set("Content-Type", "application/json").send(JSON.stringify(data));
    } else {
      res.status(404).send();
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
