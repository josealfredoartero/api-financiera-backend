import { type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { loginSchema, registerSchema } from "../types/auth.js";

function createJwtToken(payload: { userId: number; email: string; name: string }) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET must be set");
  }

  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export async function register(req: Request, res: Response) {
  const parseResult = registerSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ errors: parseResult?.error });
  }

  const { name, email, password } = parseResult.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ message: "El correo ya está en uso" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      accounts: {
        create: {
          balance: 0,
        },
      },
    },
    include: {
      accounts: true,
    },
  });

  const token = createJwtToken({ userId: user.id, email: user.email, name: user.name });

  return res.status(201).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      accounts: user.accounts,
    },
  });
}

export async function login(req: Request, res: Response) {
  const parseResult = loginSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ errors: parseResult.error });
  }

  const { email, password } = parseResult.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const matches = await bcrypt.compare(password, user.password);
  if (!matches) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const token = createJwtToken({ userId: user.id, email: user.email, name: user.name });
  return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
}

export async function me(req: Request, res: Response) {
  // NOTE: `requireAuth` ensures `req.user` is populated
  const user = (req as any).user as { id: number; email: string; name: string } | undefined;
  if (!user) return res.status(401).json({ message: "No autorizado" });

  return res.json({ user });
}
