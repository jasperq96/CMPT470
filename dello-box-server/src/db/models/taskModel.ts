export interface Task {
  id: number;
  user_id: number;
  col_id: string;
  index: number;
  start_date: string;
  end_date: string;
  title: string;
  notes: string;
}
