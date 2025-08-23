import { useState } from "react";
import type { Goal } from "../../types/habit";
import { useGoalContext } from "../../context/GoalContext";

type Props = {
  goal: Goal;
};

export default function GoalHeader({ goal }: Props) {
  const { updateGoal } = useGoalContext();

  const [editedTitle, setEditedTitle] = useState(goal.title);
  const [editedDescription, setEditedDescription] = useState(
    goal.description || ""
  );
  const [editingField, setEditingField] = useState<
    "title" | "description" | null
  >(null);

  const completedCount = goal.habits.filter((h) => h.completed).length;
  const totalCount = goal.habits.length;
  const percent =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const isNearDeadline =
    goal.deadline &&
    (new Date(goal.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24) <=
      3;

  const handleEditComplete = () => {
    updateGoal({
      ...goal,
      title: editedTitle.trim(),
      description: editedDescription.trim(),
    });
    setEditingField(null);
  };

  return (
    <header className="space-y-2">
      <div className="flex items-center gap-2">
        {editingField === "title" ? (
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleEditComplete}
            onKeyDown={(e) => e.key === "Enter" && handleEditComplete()}
            className="text-xl font-semibold border rounded px-2 py-1 text-zinc-800"
            autoFocus
          />
        ) : (
          <h2
            className="text-xl font-semibold text-zinc-800 hover:underline cursor-pointer"
            onClick={() => setEditingField("title")}
          >
            {goal.title}
          </h2>
        )}
      </div>

      <div>
        {editingField === "description" ? (
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            onBlur={handleEditComplete}
            rows={2}
            className="w-full border rounded px-2 py-1 text-sm"
            autoFocus
          />
        ) : (
          <p
            className="text-sm text-zinc-600 whitespace-pre-wrap hover:underline cursor-pointer"
            onClick={() => setEditingField("description")}
          >
            {goal.description || "No description"}
          </p>
        )}
      </div>

      <div className="text-xs text-zinc-500 flex items-center gap-2">
        {goal.deadline && <span>📅 Deadline: {goal.deadline}</span>}
        {isNearDeadline && (
          <span className="text-red-500 font-medium">⏰ Deadline is near!</span>
        )}
      </div>

      <div>
        <div className="w-full bg-zinc-200 rounded h-2">
          <div
            className="bg-zinc-600 h-2 rounded"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-xs text-zinc-500">{percent}% completed</p>
      </div>
    </header>
  );
}
