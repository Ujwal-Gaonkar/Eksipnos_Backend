import jwt, { JwtPayload } from 'jsonwebtoken';

// Interface for payload
export interface TokenPayload extends JwtPayload {
  userId: string;
  role: string;
}

// Generate JWT token
export const generateToken = (userId: string, role: string): string => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
  }

  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '1d' });
};

// Verify JWT token
export const verifyToken = (token: string): TokenPayload => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
  }

  try {
    // Verify token and return the decoded payload
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (err: any) {
    // Provide a more detailed error message depending on the issue
    if (err.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    } else if (err.name === 'JsonWebTokenError') {
      throw new Error('Token is invalid');
    } else {
      throw new Error('Token verification failed');
    }
  }
};
