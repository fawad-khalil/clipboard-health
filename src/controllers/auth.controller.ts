import { AuthService } from '../services/auth.service';
import {Request, Response} from "express";
import { AUTH_FAILED, INTERNAL_SERVER_ERROR, SIGNOUT_200 } from '../constants';

export class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  public signin = (req: Request, res: Response) => {
    try {
      const auth = this.authService.signin(req.body);

      if (auth) {
        res.status(200).send({token: auth});
      } else {
        res.status(401).send({error: AUTH_FAILED});
      }
    } catch (error) {
      res.status(500).send({message: INTERNAL_SERVER_ERROR, error});
    }
  }

  public signout = (req: Request, res: Response) => {
    const { authorization } = req.headers;
    try {
      this.authService.signout(authorization.split(' ')[1]);

      res.status(200).send({message: SIGNOUT_200})
    } catch (error) {
      res.status(500).send({message: INTERNAL_SERVER_ERROR, error});
    }
  }
}
