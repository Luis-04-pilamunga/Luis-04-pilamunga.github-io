import { useState, useEffect } from 'react';
import { Task, TaskStats, TaskCategory, TaskPriority } from '@/types/Task';

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Completar presentación del proyecto',
    description: 'Preparar slides para la reunión del lunes',
    completed: false,
    category: 'work',
    priority: 'high',
    createdAt: new Date(),
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    title: 'Hacer ejercicio',
    description: '30 minutos de cardio',
    completed: true,
    category: 'health',
    priority: 'medium',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    completedAt: new Date(),
  },
  {
    id: '3',
    title: 'Leer capítulo de libro',
    description: 'Continuar con "Atomic Habits"',
    completed: false,
    category: 'learning',
    priority: 'medium',
    createdAt: new Date(),
  },
  {
    id: '4',
    title: 'Comprar groceries',
    description: 'Leche, pan, frutas',
    completed: false,
    category: 'shopping',
    priority: 'low',
    createdAt: new Date(),
  },
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date(),
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const toggleTask = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date() : undefined,
            }
          : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const editTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  const getTaskStats = (): TaskStats => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    
    // Calculate today's completed tasks
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCompleted = tasks.filter(task => 
      task.completed && 
      task.completedAt && 
      task.completedAt >= today
    ).length;

    // Simple streak calculation (consecutive days with completed tasks)
    const currentStreak = calculateStreak();

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate,
      currentStreak,
      todayCompleted,
    };
  };

  const calculateStreak = (): number => {
    // Simplified streak calculation
    const completedDates = tasks
      .filter(task => task.completed && task.completedAt)
      .map(task => {
        const date = new Date(task.completedAt!);
        date.setHours(0, 0, 0, 0);
        return date.getTime();
      });

    const uniqueDates = [...new Set(completedDates)].sort((a, b) => b - a);
    
    if (uniqueDates.length === 0) return 0;

    let streak = 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTime = today.getTime();

    // Check if today has completed tasks
    if (uniqueDates[0] !== todayTime) {
      // Check if yesterday has completed tasks
      const yesterday = todayTime - 24 * 60 * 60 * 1000;
      if (uniqueDates[0] !== yesterday) return 0;
    }

    for (let i = 1; i < uniqueDates.length; i++) {
      const expectedPrevDay = uniqueDates[i - 1] - 24 * 60 * 60 * 1000;
      if (uniqueDates[i] === expectedPrevDay) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const getTasksByCategory = (category: TaskCategory) => {
    return tasks.filter(task => task.category === category);
  };

  const getTasksByPriority = (priority: TaskPriority) => {
    return tasks.filter(task => task.priority === priority);
  };

  const getPendingTasks = () => {
    return tasks.filter(task => !task.completed);
  };

  const getCompletedTasks = () => {
    return tasks.filter(task => task.completed);
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    getTaskStats,
    getTasksByCategory,
    getTasksByPriority,
    getPendingTasks,
    getCompletedTasks,
  };
}