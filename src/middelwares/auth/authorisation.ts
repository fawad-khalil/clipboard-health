import { NextFunction, Request, Response } from "express";
import { AuthorisationOptions } from "../../@types/index.d";
import { AUTHORISATION_FAILED } from "../../constants";

export const authorise = (opts: AuthorisationOptions) => {
  return (_req: Request, res: Response, next: NextFunction) => {
    const { role, uid } = res.locals;
    // const { id } = req.params;

    // if (opts.allowSameUser && id && uid === id) return next();

    if (!role) return res.status(403).json({ message: AUTHORISATION_FAILED });

    if (opts.hasRole.includes(role)) return next();

    return res.status(403).json({ message: AUTHORISATION_FAILED });
  };
};
