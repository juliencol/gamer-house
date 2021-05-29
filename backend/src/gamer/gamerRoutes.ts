import { Request, Response, Router } from "express";
import { createGamer, deleteGamer, getGamer, getGamers } from "./gamer";
import { CreateGamerArgs } from "./gamer.types";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const gamerArgs: CreateGamerArgs = {
      password: req.body.password,
      pseudo: req.body.pseudo,
      email: req.body.email,
      birthDate: req.body.birthDate,
    };
    const gamer = await createGamer(gamerArgs);
    res.status(201).json(gamer);
  } catch (e) {
    res
      .status(500)
      .json({ error: `The gamer could not be created: ${e.message}` });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const gamers = await getGamers();
    res.status(201).json(gamers);
  } catch (e) {
    res.status(500).json({ error: `Could not find any gamer: ${e.message}` });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const gamer = await getGamer(req.params.id);
    res.status(201).json(gamer);
  } catch (e) {
    res
      .status(500)
      .json({ error: `The gamer could not be found: ${e.message}` });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const gamer = await deleteGamer(req.params.id);
    res.status(201).json(gamer);
  } catch (e) {
    res
      .status(500)
      .json({ error: `The gamer could not be deleted: ${e.message}` });
  }
});

export default router;
