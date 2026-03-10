import { Router } from "express";

import { AccountController } from "../controllers/accountController.ts";
import { requireAuth } from "../middleware/auth.js";

export const accountRouter = <ReturnType<typeof Router>>Router();

accountRouter.post("/create", requireAuth, AccountController.create);
accountRouter.get("/find", requireAuth, AccountController.findAll);
accountRouter.get("/find/:id", requireAuth, AccountController.findById);
accountRouter.put("/update/:id", requireAuth, AccountController.update);
accountRouter.delete("/delete/:id", requireAuth, AccountController.delete);
