// src/routes/fulltrip.ts
import express, { Request, Response } from "express";
import { FullTrip } from "../models/types";
import FullTrips from "../services/fullTripData-svc";

const router = express.Router();

router.get("/", (_: Request, res: Response) => {
  FullTrips.index()
    .then((list: FullTrip[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  FullTrips.get(id)
    .then((trip: FullTrip) => res.json(trip))
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newFullTrip = req.body;

  FullTrips.create(newFullTrip)
    .then((trip: FullTrip) => res.status(201).json(trip))
    .catch((err) => res.status(500).send(err));
});

router.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const newFullTrip = req.body;

  FullTrips.update(id, newFullTrip)
    .then((trip: FullTrip) => res.json(trip))
    .catch((_) => res.status(404).end());
});

router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  FullTrips.remove(id)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;
