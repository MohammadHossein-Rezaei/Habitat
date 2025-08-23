import { useState } from "react";
import type { Habit, Goal } from "../../types/habit";
import { useGoalContext } from "../../context/GoalContext";

type Props = {
  goal: Goal;
};

export default function HabitList({ goal }: Props) {
  const { updateGoal } = useGoalContext();
  const [editingHabitId, setEditingHabitId] = useState<string | null>(null);
  const [editedHabitTitle, setEditedHabitTitle] = useState("");

  const toggleHabit = (habit: Habit) => {
    const updatedHabits = goal.habits.map((h) =>
      h.id === habit.id ? { ...h, completed: !h.completed } : h
    );
    updateGoal({ ...goal, habits: updatedHabits });
  };

  const deleteHabit = (goalId: string, habitId: string) => {
    const updatedHabits = goal.habits.filter((h) => h.id !== habitId);
    updateGoal({ ...goal, habits: updatedHabits });
  };

  const handleEdit = (habit: Habit) => {
    setEditingHabitId(habit.id);
    setEditedHabitTitle(habit.title);
  };

  const handleEditComplete = (habitId: string) => {
    const updatedHabits = goal.habits.map((h) =>
      h.id === habitId ? { ...h, title: editedHabitTitle.trim() } : h
    );
    updateGoal({ ...goal, habits: updatedHabits });
    setEditingHabitId(null);
  };

  return (
    <ul className="space-y-2">
      {goal.habits.map((habit) => (
        <li
          key={habit.id}
          className="flex items-center justify-between p-3 bg-white rounded border border-zinc-200 shadow-sm"
        >
          <div className="flex items-center gap-2 flex-1">
            <input
              type="checkbox"
              checked={habit.completed}
              onChange={() => toggleHabit(habit)}
              className="w-4 h-4 accent-zinc-600"
            />
            {editingHabitId === habit.id ? (
              <input
                value={editedHabitTitle}
                onChange={(e) => setEditedHabitTitle(e.target.value)}
                onBlur={() => handleEditComplete(habit.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleEditComplete(habit.id);
                }}
                className="border px-2 py-1 text-sm rounded w-full"
                autoFocus
              />
            ) : (
              <span
                className={`text-sm ${
                  habit.completed
                    ? "line-through text-zinc-400"
                    : "text-zinc-800"
                }`}
              >
                {habit.title}
              </span>
            )}
          </div>
          <div className="flex gap-1 items-center ml-4">
            <button
              onClick={() => handleEdit(habit)}
              className="text-xs text-blue-500 hover:text-blue-700"
              title="Edit habit"
            >
              ✏️
            </button>
            <button
              onClick={() => deleteHabit(goal.id, habit.id)}
              className="text-xs text-red-500 hover:text-red-700"
              title="Delete habit"
            >
              🗑
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
