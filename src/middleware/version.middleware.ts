// src/middleware/version.middleware.ts
import { Request, Response, NextFunction } from "express";

export const apiVersion = (version: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Ajout de la version dans le chemin de base
    req.baseUrl = `/${version}${req.baseUrl}`;
    next();
  };
};