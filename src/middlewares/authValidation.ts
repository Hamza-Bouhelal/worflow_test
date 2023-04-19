import { NextFunction, Request, Response } from "express";

export const authValidation = (apiKey: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const API_KEY = (req.headers as any)["x-api-key"];
    if (API_KEY !== apiKey) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };
};
