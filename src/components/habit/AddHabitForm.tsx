import { useState } from "react";
import { useGoalContext } from "../../context/GoalContext";
import { v4 as uuidv4 } from "uuid";
import type { Goal } from "../../types/habit";

type Props = {
  goal: Goal;
};

export default function AddHabitForm({ goal }: Props) {
  const [habitTitle, setHabitTitle] = useState("");
  const { updateGoal } = useGoalContext();

  const handleAddHabit = () => {
    const trimmed = habitTitle.trim();
    if (trimmed === "") return;

    const newHabit = {
      id: uuidv4(),
      title: trimmed,
      completed: false,
    };

    const updatedHabits = [...goal.habits, newHabit];
    updateGoal({ ...goal, habits: updatedHabits });
    setHabitTitle("");
  };

  return (
    <div className="flex gap-2 mt-4">
      <input
        type="text"
        value={habitTitle}
        onChange={(e) => setHabitTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAddHabit();
        }}
        placeholder="Add new habit..."
        className="flex-1 px-3 py-2 border border-zinc-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
      />
      <button
        onClick={handleAddHabit}
        className="text-sm px-4 py-2 bg-zinc-800 text-white rounded hover:bg-zinc-700 transition"
      >
        Add
      </button>
    </div>
  );
}
