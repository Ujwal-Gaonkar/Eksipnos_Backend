import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { verifyToken } from '../utils/jwt';

// Custom interface to add the user to the request object
interface CustomRequest extends Request {
  user?: {
    _id: string;
    name: string;
    email: string;
    role: string;
  }; // We remove `null` as a possible value here.
}

// Middleware to protect routes (JWT validation)
export const protect = async (req: CustomRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; // Extract token

    try {
      // Verify the token using the JWT secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      // Fetch user by decoded ID, excluding the password field
      const user = await User.findById(decoded.userId).select('-password');

      // Check if user exists
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Attach user to the request object (we ensure this is never null or undefined now)
      req.user = {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      };

      next(); // Proceed to the next middleware/controller
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Token verification error: ', error.message);
        return res.status(401).json({ message: 'Token is not valid or has expired' });
      } else {
        return res.status(500).json({ message: 'An unknown error occurred during token verification.' });
      }
    }
  } else {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }
};

// Middleware to check if the user has an admin role
export const admin = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next(); // If the user is an admin, proceed
  } else {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
};
