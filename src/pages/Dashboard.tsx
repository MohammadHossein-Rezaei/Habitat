import { useGoalContext } from "../context/GoalContext";

export default function Dashboard() {
  const { goals } = useGoalContext();

  const totalGoals = goals.length;
  const totalHabits = goals.reduce((sum, goal) => sum + goal.habits.length, 0);

  const goalStats = goals.map((goal) => {
    const completed = goal.habits.filter((h) => h.completed).length;
    const total = goal.habits.length || 1;
    return {
      title: goal.title,
      percent: Math.round((completed / total) * 100),
    };
  });

  const avgProgress = goalStats.length
    ? Math.round(
        goalStats.reduce((sum, g) => sum + g.percent, 0) / goalStats.length
      )
    : 0;

  const completedGoals = goalStats.filter((g) => g.percent === 100).length;
  const inProgressGoals = totalGoals - completedGoals;

  const maxProgress = goalStats.reduce((max, g) => Math.max(max, g.percent), 0);
  const minProgress = goalStats.reduce(
    (min, g) => Math.min(min, g.percent),
    100
  );

  return (
    <div className="max-w-3xl mx-auto mt-12 space-y-8 text-zinc-900">
      <h1 className="text-2xl font-semibold tracking-tight">
        📊 Your Progress Overview
      </h1>

      <ul className="text-sm leading-relaxed space-y-1 pl-1">
        <li>
          Total Goals: <span className="font-medium">{totalGoals}</span>
        </li>
        <li>
          Total Habits: <span className="font-medium">{totalHabits}</span>
        </li>
        <li>
          Average Completion:{" "}
          <span className="font-medium">{avgProgress}%</span>
        </li>
        <li>
          Completed Goals: <span className="font-medium">{completedGoals}</span>
        </li>
        <li>
          In-Progress Goals:{" "}
          <span className="font-medium">{inProgressGoals}</span>
        </li>
        <li>
          Max Goal Progress: <span className="font-medium">{maxProgress}%</span>
        </li>
        <li>
          Min Goal Progress: <span className="font-medium">{minProgress}%</span>
        </li>
      </ul>

      <hr className="border-zinc-200" />

      <div className="space-y-6">
        <h2 className="text-lg font-medium tracking-tight text-zinc-800">
          Each Goal Progress
        </h2>

        {goalStats.map((g) => (
          <div key={g.title}>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-zinc-700">{g.title}</p>
              <p className="text-xs text-zinc-500">{g.percent}%</p>
            </div>
            <div className="w-full bg-zinc-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-zinc-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${g.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
