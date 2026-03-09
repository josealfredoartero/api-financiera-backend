import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import { authRouter } from "./routes/auth.js";

dotenv.config();

const app = express();

// `helmet` is ESM and the TypeScript typings can sometimes be interpreted as a module namespace.
// Cast to `any` here to avoid TS errors while still using the runtime function.
app.use((helmet as any)());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/auth", authRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const port = Number(process.env.PORT ?? 4000);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
