import { NextFunction, Request, Response } from "express";
import { AUTHORISATION_FAILED } from "../src/constants";
import { authorise } from "../src/middelwares/auth/authorisation";
import { AuthorisationOptions } from "../src/@types/index.d";

describe('authorise middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  // let authorise: (opts: AuthorisationOptions) => void;

  beforeEach(() => {
    req = {};
    res = {
      locals: { role: 'user', uid: 'user_id' },
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    next = jest.fn();
    // authorise = (opts) => authorise(opts);
  });

  it('should call next if the user has the required role', async () => {
    // @ts-ignore
    await authorise({ hasRole: ['user', 'admin'] })(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return 403 if the user does not have the required role', async () => {
    res.locals.role = 'guest';
    // @ts-ignore
    await authorise({ hasRole: ['user', 'admin'] })(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: AUTHORISATION_FAILED });
  });

  it('should return 403 if the role is not present in res.locals', async () => {
    res.locals.role = undefined;
    // @ts-ignore
    await authorise({ hasRole: ['user', 'admin'] })(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: AUTHORISATION_FAILED });
  });
});