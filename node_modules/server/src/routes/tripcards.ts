import express, { Request, Response } from "express";
import { TripCardData } from "../models/types";

import TripCards from "../services/tripCardData-svc";

const router = express.Router();

router.get("/", (_: Request, res: Response) => {
  TripCards.index()
    .then((list: TripCardData[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:tripID", (req: Request, res: Response) => {
  const { tripID } = req.params;

  TripCards.get(tripID)
    .then((card: TripCardData) => res.json(card))
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newTripCardData = req.body;

  TripCards.create(newTripCardData)
    .then((traveler: TripCardData) => res.status(201).json(traveler))
    .catch((err) => res.status(500).send(err));
});

router.put("/:tripID", (req: Request, res: Response) => {
  const { tripID } = req.params;
  const newTripCardData = req.body;

  TripCards.update(tripID, newTripCardData)
    .then((data: TripCardData) => res.json(data))
    .catch((err) => res.status(404).end());
});

router.delete("/:tripID", (req: Request, res: Response) => {
  const { tripID } = req.params;

  TripCards.remove(tripID)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;
