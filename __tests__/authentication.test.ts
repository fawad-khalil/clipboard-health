import { NextFunction, Request, Response } from "express";
import { AUTH_FAILED } from "../src/constants";
import { authenticate } from "../src/middelwares/auth/authentication";
import jwt from 'jsonwebtoken';

describe('authenticate middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { headers: { authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaGFubmVzQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwidWlkIjoiMiJ9.diNJu5QM_uNfH-9HhXiEtvF-CHaESuDtSyvsi4_6s6A' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      locals: {}
    };
    next = jest.fn();
  });

  it('should call next if the authorization header is valid', async () => {
    // jest.spyOn(jwt, 'verify').mockReturnValue({ uid: 'user_id', role: 'user', email: 'user@example.com' });
    // @ts-ignore
    await authenticate(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.locals).toEqual({ uid: '2', role: 'admin', email: 'johannes@example.com' });
  });

  it('should return 401 if the authorization header is missing', async () => {
    req.headers.authorization = null;
    // @ts-ignore
    await authenticate(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: AUTH_FAILED });
  });

  it('should return 401 if the authorization header is malformed', async () => {
    req.headers.authorization = 'invalid_token';
    // @ts-ignore
    await authenticate(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: AUTH_FAILED });
  });

  it('should return 500 if the token is invalid', async () => {
    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error('invalid token');
    });
  });
});