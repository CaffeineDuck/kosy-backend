import { Role } from '@prisma/client';

export class JwtUserPayload {
  username: string;
  role: Role;
  userId: number;
}
