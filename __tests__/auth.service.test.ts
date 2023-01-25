const redisMock = require("redis-mock");
import { RedisService } from "../src/services/redis.service";
import { AuthService } from "../src/services/auth.service";

describe('Auth Service', () => {
  let redis: RedisService;
  beforeAll(() => {
    const client = redisMock.createClient();
    redis = new RedisService(client);
  });

  it('should return a token if the email and password match', async () => {
    jest.spyOn(redis, 'set').mockImplementation(() => Promise.resolve('true'));
    const authService = new AuthService(redis);
    const token = authService.signin({email: 'johannes@example.com', password: 'admin123'}, 'secret');
    
    expect(token).toBeTruthy();
  });

  it('should return false if the email and password do not match', async () => {
    jest.spyOn(redis, 'set').mockImplementation(() => Promise.resolve('true'));
    const authService = new AuthService(redis);
    const token = authService.signin({email: 'test@example.com', password: 'testpassword'});
    
    expect(token).toEqual(false);
  });
});
