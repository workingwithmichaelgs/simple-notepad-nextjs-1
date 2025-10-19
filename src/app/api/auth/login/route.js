import { promises as fs } from 'fs';
import path from 'path';
import { comparePassword } from '@/lib/bcrypt';
import { handleError, AppError } from '@/lib/errorHandler';
import { signToken } from '@/lib/jwt';

const usersFile = path.join(process.cwd(), 'src/data/users.json');

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
     return handleError(null, 'Email and password are required', 400);
    }

    // Read users
    let users = [];
    try {
      const fileData = await fs.readFile(usersFile, 'utf8');
      users = JSON.parse(fileData || '[]');
    } catch {
      users = [];
    }

    const user = users.find((u) => u.email === email);
    if (!user){
     return handleError(null, 'Invalid email or password', 401);
    } 

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
        return handleError(null, 'Invalid email or password', 401);
    }

    // Sign JWT
    const token = signToken({ id: user.id, email: user.email });
    // console.log(token, "ini token");

    return new Response(JSON.stringify({ message: 'Login successful', token }), { status: 200 });
  } catch (err) {
    console.error(err);
    return handleError(err);
  }
}
