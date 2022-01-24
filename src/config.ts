import { JwtModuleOptions } from '@nestjs/jwt';
import { RedisModuleOptions } from 'nestjs-redis';

export default (): {
  PORT: number;
  REDIS: RedisModuleOptions;
  JWT_REFRESH_EXPIRY: number | string;
  JWT: JwtModuleOptions;
} => ({
  PORT: +process.env.PORT || 3000,
  REDIS: {
    name: 'kosy',
    url: process.env.REDIS_URI || 'redis://localhost:6379',
  },
  JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || '15d',
  JWT: {
    secret: process.env.JWT_SECRET || 'sdflkjsdfjlksd*&@#4ry7',
    signOptions: {
      expiresIn: process.env.JWT_EXPIRY || '5m',
    },
  },
});
