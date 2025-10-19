import { promises as fs } from 'fs';
import path from 'path';
import { hashPassword } from '@/lib/bcrypt';
import { handleError } from '@/lib/errorHandler';
import { v4 as uuidv4 } from 'uuid';

const usersFile = path.join(process.cwd(), 'src/data/users.json');

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return handleError(null, 'Email and password are required', 400);
    }

    // Read existing users
    let users = [];
    try {
      const fileData = await fs.readFile(usersFile, 'utf8');
      users = JSON.parse(fileData || '[]');
    } catch {
      users = [];
    }

    // Check if email already exists
    if (users.find((u) => u.email === email)) {
      return handleError(null, 'Email already registered', 400);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Add new user with id
    const newUser = {
      id: uuidv4(),
      email,
      password: hashedPassword
    };
    users.push(newUser);

    // Save to file
    await fs.writeFile(usersFile, JSON.stringify(users, null, 2));

    return new Response(
      JSON.stringify({ message: 'User registered successfully', userId: newUser.id }),
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return handleError();
  }
}
