import { useParams, useNavigate } from "react-router-dom";
import { useGoalContext } from "../context/GoalContext";
import { useState } from "react";
import Button from "../components/common/Button";
import { v4 as uuidv4 } from "uuid";
export default function GoalDetails() {
  const [editingDescId, setEditingDescId] = useState<string | null>(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [habitTitle, setHabitTitle] = useState("");
  const { id } = useParams<{ id: string }>();
  const [editingHabitId, setEditingHabitId] = useState<string | null>(null);
  const [editedHabitTitle, setEditedHabitTitle] = useState("");
  const { goals, updateGoal, toggleHabitCompletion, deleteHabit } =
    useGoalContext();
  const navigate = useNavigate();

  const goal = goals.find((g) => g.id === id);

  if (!goal) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center text-zinc-500">
        <p className="text-sm">Goal not found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-sm text-zinc-700 underline"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold text-zinc-800 mb-2">
        {goal.title}
      </h1>
      {goal.description && (
        <p className="text-zinc-600 text-sm mb-6">{goal.description}</p>
      )}
      <div className="mt-4">
        <h3 className="text-sm text-zinc-500 font-medium mb-1">Description</h3>

        {editingDescId === goal.id ? (
          <div className="space-y-2">
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              rows={3}
              className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const updatedGoal = {
                    ...goal,
                    description: editedDescription.trim(),
                  };
                  updateGoal(updatedGoal);
                  setEditingDescId(null);
                }}
                className="text-sm bg-zinc-800 text-white px-3 py-1 rounded hover:bg-zinc-700"
              >
                Save
              </button>
              <button
                onClick={() => setEditingDescId(null)}
                className="text-sm text-zinc-500 hover:text-zinc-700"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-start">
            <p className="text-zinc-700 text-sm whitespace-pre-wrap">
              {goal.description || "No description."}
            </p>
            <button
              onClick={() => {
                setEditedDescription(goal.description || "");
                setEditingDescId(goal.id);
              }}
              className="text-sm text-zinc-400 hover:text-zinc-700 ml-2"
              title="Edit Description"
            >
              ✏️
            </button>
          </div>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!habitTitle.trim() || !goal) return;

          const newHabit = {
            id: uuidv4(),
            title: habitTitle.trim(),
            completed: false,
          };

          const updatedGoal = {
            ...goal,
            habits: [...goal.habits, newHabit],
          };

          updateGoal(updatedGoal);
          setHabitTitle("");
        }}
        className="mb-6 space-y-2"
      >
        <label htmlFor="habit" className="block text-sm text-zinc-600">
          Add Habit
        </label>
        <div className="flex items-center gap-2">
          <input
            id="habit"
            type="text"
            value={habitTitle}
            onChange={(e) => setHabitTitle(e.target.value)}
            placeholder="e.g. Wake up at 6am"
            className="flex-1 px-3 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm"
          />
          <Button type="submit">Add</Button>
        </div>
      </form>
      <div className="border-t border-zinc-200 pt-4">
        <div className="space-y-2">
          {goal.habits.length === 0 ? (
            <p className="text-sm text-zinc-400 italic">No habits added yet.</p>
          ) : (
            <ul className="space-y-2">
              {goal.habits.map((habit) => (
                <li
                  key={habit.id}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="checkbox"
                      checked={habit.completed}
                      onChange={() => toggleHabitCompletion(goal.id, habit.id)}
                      className="w-4 h-4 accent-zinc-600"
                    />

                    {editingHabitId === habit.id ? (
                      <input
                        value={editedHabitTitle}
                        onChange={(e) => setEditedHabitTitle(e.target.value)}
                        onBlur={() => {
                          const updatedHabits = goal.habits.map((h) =>
                            h.id === habit.id
                              ? { ...h, title: editedHabitTitle.trim() }
                              : h
                          );
                          updateGoal({ ...goal, habits: updatedHabits });
                          setEditingHabitId(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const updatedHabits = goal.habits.map((h) =>
                              h.id === habit.id
                                ? { ...h, title: editedHabitTitle.trim() }
                                : h
                            );
                            updateGoal({ ...goal, habits: updatedHabits });
                            setEditingHabitId(null);
                          }
                        }}
                        className="border px-2 py-1 text-sm rounded"
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

                  <div className="flex gap-1 items-center">
                    <button
                      onClick={() => {
                        setEditedHabitTitle(habit.title);
                        setEditingHabitId(habit.id);
                      }}
                      className="text-xs text-blue-500 hover:text-blue-700"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteHabit(goal.id, habit.id)}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      🗑
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
