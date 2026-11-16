import { AuthenticatedUser } from "../services/authService.js";

declare global {
  namespace Express {
    interface User extends AuthenticatedUser {}
  }
}

export {};