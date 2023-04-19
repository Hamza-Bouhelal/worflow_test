import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const validate =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  };

export const validateShoesBody = Joi.object({
  shoesName: Joi.array().items(Joi.string()).min(1).required(),
});
