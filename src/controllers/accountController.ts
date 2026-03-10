import type { Request, Response } from "express"
import { AccountService } from "../services/account.service.ts"
import type { AuthenticatedRequest } from "../middleware/auth.ts";

export const AccountController = {
    create: async (req: AuthenticatedRequest, res: Response) => {
        if (!req.user) return res.status(401).json({ message: "No autorizado" })
        const account = await AccountService.create({ ...req.body, userId: req.user?.id })

        return res.status(201).json(account)
    },
    findAll: async (req: AuthenticatedRequest, res: Response) => {
        if (!req.user) return res.status(401).json({ message: "No autorizado" })
        const accounts = await AccountService.findAll({
            where: { userId: req.user?.id }
        })

        return res.status(200).json(accounts)
    },
    findById: async (req: AuthenticatedRequest, res: Response) => {
        if (!req.user) return res.status(401).json({ message: "No autorizado" })
        const account = await AccountService.findById(Number(req.params.id))

        return res.status(200).json(account)
    },
    update: async (req: AuthenticatedRequest, res: Response) => {
        if (!req.user) return res.status(401).json({ message: "No autorizado" })
        const account = await AccountService.update(Number(req.params.id), { ...req.body, userId: req.user?.id })

        return res.status(200).json(account)
    },
    delete: async (req: AuthenticatedRequest, res: Response) => {
        if (!req.user) return res.status(401).json({ message: "No autorizado" })
        const account = await AccountService.delete(Number(req.params.id))

        return res.status(200).json(account)
    },
}