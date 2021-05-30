import { Request, Response, Router } from "express";
import {
  changePasswordArgumentsValidator,
  createGamerArgumentsValidator,
} from "../request_validators/gamerArgumentsValidator";
import { validate } from "../request_validators/validator";
import {
  createGamer,
  deleteGamer,
  getGamer,
  getGamers,
  followGamer,
  unfollowGamer,
  updateGamer,
  changePassword,
} from "./gamer";
import { CreateGamerArgs, UpdateGamerArgs } from "./gamer.types";

const router = Router();

// Gamer management

router.post(
  "/",
  createGamerArgumentsValidator(),
  validate,
  async (req: Request, res: Response) => {
    try {
      const gamerArgs: CreateGamerArgs = {
        password: req.body.password,
        pseudo: req.body.pseudo,
        email: req.body.email.toLowerCase(),
        birthDate: req.body.birthDate,
        createdAt: new Date(),
      };
      const gamer = await createGamer(gamerArgs);
      res.status(201).json(gamer);
    } catch (e) {
      res
        .status(500)
        .json({ error: `The gamer could not be created: ${e.message}` });
    }
  }
);

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
    console.log(gamer);
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

router.put("/:id", async (req: Request, res: Response) => {
  try {
    delete req.body.password;
    const gamer = await updateGamer(req.params.id, req.body);
    res.status(201).json(gamer);
  } catch (e) {
    res
      .status(500)
      .json({ error: `The gamer could not be updated: ${e.message}` });
  }
});

router.patch(
  "/:id/password",
  changePasswordArgumentsValidator(),
  validate,
  async (req: Request, res: Response) => {
    try {
      const gamer = await changePassword(req.params.id, req.body.password);
      res.status(201).json(gamer);
    } catch (e) {
      res
        .status(500)
        .json({ error: `The gamer could not be updated: ${e.message}` });
    }
  }
);

// Following System

router.put("/:id/follow", async (req: Request, res: Response) => {
  try {
    const gamer = await followGamer(req.params.id, req.body.idToFollow);
    res.status(201).json(gamer);
  } catch (e) {
    res
      .status(500)
      .json({ error: `The gamer could not be followed: ${e.message}` });
  }
});

router.delete("/:id/unfollow", async (req: Request, res: Response) => {
  try {
    const gamer = await unfollowGamer(req.params.id, req.body.idToUnfollow);
    res.status(201).json(gamer);
  } catch (e) {
    res
      .status(500)
      .json({ error: `The gamer could not be followed: ${e.message}` });
  }
});

// Group System

export default router;
