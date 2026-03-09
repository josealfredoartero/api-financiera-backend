import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    name: string;
  };
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;
  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token de autorización requerido" });
  }

  const token = authorization.replace("Bearer ", "");
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET no está configurado");
    return res.status(500).json({ message: "Configuración del servidor incorrecta" });
  }

  try {
    const payload = jwt.verify(token, secret) as {
      userId: number;
      email: string;
      name: string;
    };

    req.user = {
      id: payload.userId,
      email: payload.email,
      name: payload.name,
    };

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}
