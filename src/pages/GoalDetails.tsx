import { useParams, useNavigate } from "react-router-dom";
import { useGoalContext } from "../context/GoalContext";
import AddHabitForm from "../components/habit/AddHabitForm";
import HabitList from "../components/habit/HabitList";
import GoalHeader from "../components/habit/GoalHeader";

export default function GoalDetails() {
  const { id } = useParams<{ id: string }>();
  const { goals } = useGoalContext();
  const navigate = useNavigate();

  const goal = goals.find((g) => g.id === id);

  if (!goal) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center text-zinc-500">
        <p className="text-sm">Goal not found.</p>
        <button
          onClick={() => navigate("/", { replace: true })}
          className="mt-4 text-sm text-zinc-700 underline"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6 text-zinc-800">
      <GoalHeader goal={goal} />
      <AddHabitForm goal={goal} />

      <div className="border-t border-zinc-200 pt-4">
        <div className="space-y-2">
          {goal.habits.length === 0 ? (
            <p className="text-sm text-zinc-400 italic">No habits added yet.</p>
          ) : (
            <HabitList goal={goal} />
          )}
        </div>
      </div>
    </div>
  );
}
