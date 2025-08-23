export type Habit = {
  id: string;
  title: string;
  completed: boolean;
};

export type Goal = {
  id: string;
  title: string;
  description?: string;
  habits: Habit[];
  deadline?: string;
};
