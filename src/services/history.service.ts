import { History } from "../models/history.model";

class HistoryService {
  static async create(
    table_column_id: number,
    table_name: string,
    old_values: string,
    userId: number,
  ) {
    return History.create({
      table_column_id,
      table_name,
      old_values,
      changedBy: userId,
    });
  }
}

export default HistoryService;
