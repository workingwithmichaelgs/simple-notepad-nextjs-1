import jwt from 'jsonwebtoken';
// console.log(process.env.JWT_SECRET);
const SECRET = process.env.JWT_SECRET || 'your-secret-key'; // replace with env in production
// console.log(SECRET, "Ini secret jwt");
export function signToken(payload, expiresIn = '1h') {
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}
