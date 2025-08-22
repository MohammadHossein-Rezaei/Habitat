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
    <div className="max-w-3xl mx-auto mt-10 space-y-6 text-zinc-800">
      <h1 className="text-2xl font-bold">📊 Your Progress Overview</h1>

      <ul className="text-sm space-y-1">
        <li>Total Goals: {totalGoals}</li>
        <li>Total Habits: {totalHabits}</li>
        <li>Average Completion: {avgProgress}%</li>
        <li>Completed Goals: {completedGoals}</li>
        <li>In-Progress Goals: {inProgressGoals}</li>
        <li>Max Goal Progress: {maxProgress}%</li>
        <li>Min Goal Progress: {minProgress}%</li>
      </ul>

      <hr />

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Each Goal Progress</h2>
        {goalStats.map((g) => (
          <div key={g.title}>
            <p className="text-sm font-medium">{g.title}</p>
            <div className="w-full bg-zinc-200 rounded h-2">
              <div
                className="bg-zinc-600 h-2 rounded"
                style={{ width: `${g.percent}%` }}
              />
            </div>
            <p className="text-xs text-zinc-500">{g.percent}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
