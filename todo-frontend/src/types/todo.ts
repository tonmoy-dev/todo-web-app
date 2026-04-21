export interface Todo {
  id: number;
  title: string;
  description?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface TodoCreate {
  title: string;
  description?: string;
  is_active: boolean;
}

export interface TodoUpdate {
  title?: string;
  description?: string;
  is_active?: boolean;
}
