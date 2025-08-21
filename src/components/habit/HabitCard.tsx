import { useState } from "react";
import { Link } from "react-router-dom";
import type { Goal } from "../../types/habit";
import { useGoalContext } from "../../context/GoalContext";

type Props = {
  goal: Goal;
};

export default function HabitCard({ goal }: Props) {
  const { deleteGoal, updateGoal } = useGoalContext();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(goal.title);

  const handleUpdate = () => {
    if (title.trim() === "") return;
    updateGoal({ ...goal, title: title.trim() });
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-start gap-4">
      {isEditing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleUpdate();
          }}
          className="flex-1 border border-zinc-300 rounded px-2 py-1 text-sm"
          autoFocus
        />
      ) : (
        <Link
          to={`/goal/${goal.id}`}
          className="flex-1 space-y-1 hover:underline"
        >
          <h3 className="text-lg font-medium text-zinc-800">{goal.title}</h3>
          <p className="text-sm text-zinc-500">{goal.description}</p>
        </Link>
      )}

      <div className="flex gap-2 items-center">
        <button
          onClick={() => setIsEditing(true)}
          className="text-sm text-blue-500 hover:text-blue-700"
        >
          ✏️
        </button>
        <button
          onClick={() => deleteGoal(goal.id)}
          className="text-sm text-red-500 hover:text-red-700"
        >
          🗑
        </button>
      </div>
    </div>
  );
}
