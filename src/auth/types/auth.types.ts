import 'express-session';
import type { SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId?: number;
  }
}

export interface UserSession extends SessionData {
  userId?: number;
}

export interface AuthRequest extends Request {
  session: UserSession;
}
