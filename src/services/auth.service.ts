import { RedisService } from "./redis.service";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/config";
import { User } from "../@types/index.d";
import { RedisClientType } from "redis";

const tempUsers = [
  { uid: '1', email: 'john@example.com', password: 'user123', role: 'user' },
  { uid: '2', email: 'johannes@example.com', password: 'admin123', role: 'admin' }
]

export class AuthService {
  private _redis: RedisService;

  constructor(redisService?: RedisService) {
    if (redisService) {
      this._redis = redisService;
      return;
    }
    this._redis = new RedisService();
  }
  private matchPassword(email:string, password: string) {
    return tempUsers.find(u => u.email === email && u.password === password)
  };

  public signin(obj: Partial<User>, secret?:string) {
    const user = this.matchPassword(obj.email, obj.password);

    if (user) {
      delete user.password;
      const token = jwt.sign(user, secret || JWT_SECRET);
      this._redis.set(user.uid, token);
      
      return token;
    } else {
      return false;
    }
  };

  public async signout(uid: string): Promise<void> {
    this._redis.delete(uid);
  };
};
