import { createClient, RedisClientType } from 'redis';
import { REDIS_URL } from '../constants/config';

export class RedisService {
  static client: RedisClientType;

  constructor(client?: RedisClientType) {
    if (!RedisService.client) {
      if (client) {
        RedisService.client = client;
        return;
      }
      RedisService.client = createClient({url: REDIS_URL});
      RedisService.client.on('error', (err) => console.log('Redis Client Error', err));
    }
  }

  public async connect() {
    await RedisService.client.connect();
  }

  public async disconnect() {
    await RedisService.client.disconnect();
  }

  public get(key: string) {
    return RedisService.client.get(key);
  }

  public set(key: string, value: any) {
    return RedisService.client.set(key, value);
  }

  public delete(key: string) {
    RedisService.client.del(key);
  }
};
