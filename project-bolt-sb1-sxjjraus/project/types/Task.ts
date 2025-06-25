export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: TaskCategory;
  priority: TaskPriority;
  createdAt: Date;
  completedAt?: Date;
  dueDate?: Date;
}

export type TaskCategory = 'work' | 'personal' | 'health' | 'learning' | 'shopping';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface TaskStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completionRate: number;
  currentStreak: number;
  todayCompleted: number;
}