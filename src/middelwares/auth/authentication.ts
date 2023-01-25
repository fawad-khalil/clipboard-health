import { NextFunction, Request, Response } from "express";
import { AUTH_FAILED, INTERNAL_SERVER_ERROR } from "../../constants";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../constants/config';
import { User } from "../../@types/index.d";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: AUTH_FAILED });
  }

  if (!authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: AUTH_FAILED });
  }

  const split = authorization.split("Bearer ");
  if (split.length !== 2) {
    return res.status(401).json({ message: AUTH_FAILED });
  }
  const token = split[1];

  try {
    const decodedToken = (await jwt.verify(token, JWT_SECRET || 'secret')) as User;
    res.locals = {
      ...res.locals,
      uid: decodedToken.uid,
      role: decodedToken.role,
      email: decodedToken.email,
    };
    return next();
  } catch (error) {
    console.error(`${error.code} -  ${error.message}`);
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};
