declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        name: string;
        email: string;
        role: string;
      }; // Define inline properties for user
    }
  }
}
