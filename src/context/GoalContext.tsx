import React, { createContext, useContext, useEffect, useState } from "react";

import type { Goal } from "../types/habit";
import { getLocalGoals, saveLocalGoals } from "../utils/uuid";

type GoalContextType = {
  goals: Goal[];
  addGoal: (goal: Goal) => void;
  updateGoal: (goal: Goal) => void;
  deleteGoal: (id: string) => void;
  toggleHabitCompletion: (goalId: string, habitId: string) => void;
  deleteHabit: (goalId: string, habitId: string) => void;
};

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export const GoalProvider = ({ children }: { children: React.ReactNode }) => {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    const stored = getLocalGoals();
    console.log("local ,", stored);
    if (stored) setGoals(stored);
  }, []);

  useEffect(() => {
    saveLocalGoals(goals);
  }, [goals]);

  const addGoal = (goal: Goal) => setGoals((prev) => [...prev, goal]);
  const updateGoal = (updatedGoal: Goal) => {
    const updatedGoals = goals.map((g) =>
      g.id === updatedGoal.id ? updatedGoal : g
    );
    setGoals(updatedGoals);
    saveLocalGoals(updatedGoals);
  };

  const deleteGoal = (id: string) =>
    setGoals((prev) => prev.filter((g) => g.id !== id));

  const toggleHabitCompletion = (goalId: string, habitId: string) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id !== goalId) return goal;

      const updatedHabits = goal.habits.map((habit) =>
        habit.id === habitId ? { ...habit, completed: !habit.completed } : habit
      );

      return { ...goal, habits: updatedHabits };
    });

    setGoals(updatedGoals);
    saveLocalGoals(updatedGoals);
  };
  const deleteHabit = (goalId: string, habitId: string) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id !== goalId) return goal;

      const filteredHabits = goal.habits.filter(
        (habit) => habit.id !== habitId
      );

      return { ...goal, habits: filteredHabits };
    });

    setGoals(updatedGoals);
    saveLocalGoals(updatedGoals);
  };

  return (
    <GoalContext.Provider
      value={{
        goals,
        addGoal,
        updateGoal,
        deleteGoal,
        toggleHabitCompletion,
        deleteHabit,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

export const useGoalContext = () => {
  const context = useContext(GoalContext);
  if (!context)
    throw new Error("useGoalContext must be used within a GoalProvider");
  return context;
};
