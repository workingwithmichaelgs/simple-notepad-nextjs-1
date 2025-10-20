import { promises as fs } from 'fs';
import path from 'path';
import { handleError } from '@/lib/errorHandler';
import { verifyToken } from '@/lib/jwt';
import { v4 as uuidv4 } from 'uuid';

const notesFile = path.join(process.cwd(), 'src/data/notes.json');

export async function GET(req) {
    // console.log("masuk get notes");
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader)  {
        return handleError(new Error('Missing token'), 401);
    }

    const token = authHeader.split(' ')[1];
    const user = verifyToken(token);

    const fileData = await fs.readFile(notesFile, 'utf8');
    const notes = JSON.parse(fileData || '[]');

    const userNotes = notes.filter(n => n.userId === user.id);
    return new Response(JSON.stringify(userNotes), { status: 200 });
  } catch (err) {
    console.error(err);
    return handleError(err);
  }
}

export async function POST(req) {
    // console.log(await req.json(), "masuk post note");
  try {
    const authHeader = req.headers.get('Authorization');
    // console.log("authHeader:", authHeader);
    if (!authHeader) {
        return handleError(new Error('Missing token'), 401);
    }

    const token = authHeader.split(' ')[1];
    const user = verifyToken(token);

    const { title, content } = await req.json();
    if (!title || !content) {
        return handleError(new Error('Title and content required'), 400);
    }

    const fileData = await fs.readFile(notesFile, 'utf8');
    const notes = JSON.parse(fileData || '[]');

    const newNote = {
      id: uuidv4(),
      title,
      content,
      userId: user.id,
      updatedAt: new Date().toISOString()
    };

    notes.push(newNote);
    await fs.writeFile(notesFile, JSON.stringify(notes, null, 2));

    return new Response(JSON.stringify({ message: 'Note created successfully' }), { status: 201 });
  } catch (err) {
    console.error(err);
    return handleError(err);
  }
}
