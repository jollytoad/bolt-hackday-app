export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export type FilterType = 'all' | 'active' | 'completed';