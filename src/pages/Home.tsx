import { useState } from "react";
import Button from "../components/common/Button";
import HabitCard from "../components/habit/HabitCard";
import { useGoalContext } from "../context/GoalContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { goals } = useGoalContext();
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );
  const filteredGoals = goals.filter((goal) => {
    const completed = goal.habits.filter((h) => h.completed).length;
    const total = goal.habits.length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    if (filter === "completed") return percent === 100;
    if (filter === "incomplete") return percent < 100;
    return true;
  });
  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-800">Your Goals</h2>
        <div className="flex gap-2 items-center">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border text-sm rounded px-2 py-1 bg-white"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">In Progress</option>
          </select>

          <Link to="/add">
            <Button>+ Add Goal</Button>
          </Link>
        </div>
      </div>

      {filteredGoals.length === 0 ? (
        <p className="text-zinc-500 text-sm">
          No goals yet. Start by adding one!
        </p>
      ) : (
        <ul className="space-y-4">
          {filteredGoals.map((goal) => (
            <li
              key={goal.id}
              className="p-4 bg-white rounded shadow hover:shadow-md transition border border-zinc-200"
            >
              <HabitCard goal={goal} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
