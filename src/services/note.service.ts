import { Note } from "../models/note.model";
import HistoryService from "./history.service";

class NoteService {
  static async create(title: string, content: string, userId: number) {
    return Note.create({ title, content, createdBy: userId });
  }

  static async getNotes(userId: number) {
    return Note.findAll({ where: { createdBy: userId } });
  }

  static async getNoteById(id: number, userId: number) {
    return Note.findOne({ where: { id, createdBy: userId } });
  }

  static async update(
    id: number,
    title: string,
    content: string,
    userId: number,
  ) {
    const note = await Note.findOne({ where: { id, createdBy: userId } });
    const previousValue = {
      title: note.title,
      content: note.content,
    };
    if (note) {
      await note.update({ title, content });
      await HistoryService.create(
        id,
        Note.tableName,
        JSON.stringify(previousValue),
        userId,
      );
      return note;
    }
    return null;
  }

  static async delete(id: number, userId: number) {
    const note = await Note.findOne({ where: { id, createdBy: userId } });
    if (note) {
      await note.destroy();
      return note;
    }
    return null;
  }
}

export default NoteService;
