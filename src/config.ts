import { JwtModuleOptions } from '@nestjs/jwt';
import { RedisModuleOptions } from 'nestjs-redis';

export default (): {
  PORT: number;
  REDIS: RedisModuleOptions;
  JWT: JwtModuleOptions;
} => ({
  PORT: +process.env.PORT || 3000,
  REDIS: {
    name: 'kosy',
  url: process.env.REDIS_URI || 'redis://localhost:6379',
  },
  JWT: {
  secretOrPrivateKey: process.env.JWT_SECRET || 'sdflkjsdfjlksd*&@#4ry7',
    signOptions: {
      expiresIn: process.env.JWT_EXPIRY || '5m',
    },
  },
});
