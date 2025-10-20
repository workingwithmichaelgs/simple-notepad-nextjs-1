
import { promises as fs } from 'fs';
import path from 'path';
import { handleError } from '@/lib/errorHandler';
import { verifyToken } from '@/lib/jwt';
export async function PUT(req, { params }) {
    // console.log("masuk put note", params.id);
  try {
    const notesFile = path.join(process.cwd(), 'src/data/notes.json');
    const authHeader = req.headers.get('Authorization');
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

    const noteIndex = notes.findIndex(n => n.id === params.id && n.userId === user.id);
    if (noteIndex === -1) {
      return handleError(new Error('Note not found'), 404);
    }

    notes[noteIndex] = { ...notes[noteIndex], title, content };
    await fs.writeFile(notesFile, JSON.stringify(notes, null, 2));

    return new Response(JSON.stringify({ message: 'Note updated successfully' }), { status: 200 });
  } catch (err) {
    console.error(err);
    return handleError(err);
  }
}
