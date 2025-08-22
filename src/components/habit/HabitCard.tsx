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

  const completedCount = goal.habits.filter((h) => h.completed).length;
  const totalCount = goal.habits.length;
  const percent =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
  const isNearDeadline = goal.deadline
    ? (new Date(goal.deadline).getTime() - Date.now()) /
        (1000 * 60 * 60 * 24) <=
      3
    : false;

  const handleUpdate = () => {
    if (title.trim() === "") return;
    updateGoal({ ...goal, title: title.trim() });
    setIsEditing(false);
  };

  return (
    <div className="p-4 rounded border border-zinc-200 bg-white hover:shadow-sm transition space-y-3">
      {/* بخش بالایی: عنوان و دکمه‌ها */}
      <div className="flex justify-between items-start">
        {isEditing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUpdate();
            }}
            className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
            autoFocus
          />
        ) : (
          <Link to={`/goal/${goal.id}`} className="flex-1">
            <h3 className="text-lg font-semibold text-zinc-800">
              {goal.title}
            </h3>
            {goal.description && (
              <p className="text-sm text-zinc-600 mt-1">{goal.description}</p>
            )}
            {goal.deadline && (
              <p className="text-xs text-zinc-400 mt-1">
                Deadline: {goal.deadline}
              </p>
            )}
            {isNearDeadline && (
              <p className="text-xs text-red-500 font-medium mt-1">
                ⏰ Deadline is near!
              </p>
            )}
          </Link>
        )}

        <div className="flex gap-2 items-start pl-4">
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-blue-500 hover:text-blue-700"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={() => deleteGoal(goal.id)}
            className="text-sm text-red-500 hover:text-red-700"
            title="Delete"
          >
            🗑
          </button>
        </div>
      </div>

      {/* نوار پیشرفت */}
      <div className="space-y-1">
        <div className="w-full bg-zinc-200 rounded h-2 overflow-hidden">
          <div
            className="bg-zinc-700 h-full transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-xs text-zinc-500">{percent}% completed</p>
      </div>
    </div>
  );
}
