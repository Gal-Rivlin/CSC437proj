import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import TripCards from "./services/tripCardData-svc";
import TripCardRouter from "./routes/tripcards";
import auth, { authenticateUser } from "./routes/auth";
import path from "path";

connect("traveling");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";
//app.use(express.static(path.resolve(__dirname, "../../proto")));
app.use(express.json());
app.use(express.static(staticDir));

app.use("/api/tripcards", authenticateUser, TripCardRouter);
app.use("/auth", auth);

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
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
