import { Request, Response } from "express";
import NoteService from "../services/note.service";

class NoteController {
  static async create(req: Request, res: Response) {
    try {
      const { title, content } = req.body;
      const userId = req.user.id;
      const newNote = await NoteService.create(title, content, userId);
      res.status(201).json(newNote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getNotes(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const notes = await NoteService.getNotes(userId);
      res.status(200).json(notes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getNoteById(req: Request, res: Response) {
    try {
      const noteId = parseInt(req.params.id, 10);
      const userId = req.user.id;
      const note = await NoteService.getNoteById(noteId, userId);
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ error: "Note not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const noteId = parseInt(req.params.id, 10);
      const { title, content } = req.body;
      const userId = req.user.id;
      const updatedNote = await NoteService.update(
        noteId,
        title,
        content,
        userId,
      );
      if (updatedNote) {
        res.status(200).json(updatedNote);
      } else {
        res.status(404).json({ error: "Note not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const noteId = parseInt(req.params.id, 10);
      const userId = req.user.id;
      const deletedNote = await NoteService.delete(noteId, userId);
      if (deletedNote) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Note not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default NoteController;
