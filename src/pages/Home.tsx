import Button from "../components/common/Button";
import HabitCard from "../components/habit/HabitCard";
import { useGoalContext } from "../context/GoalContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { goals } = useGoalContext();

  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-800">Your Goals</h2>
        <Link to="/add">
          <Button> + Add Goal </Button>
        </Link>
      </header>

      {goals.length === 0 ? (
        <p className="text-zinc-500 text-sm">
          No goals yet. Start by adding one!
        </p>
      ) : (
        <ul className="space-y-4">
          {goals.map((goal) => (
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
