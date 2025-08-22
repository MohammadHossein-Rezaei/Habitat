import type { Goal } from "../types/habit";

const LOCAL_KEY = "habitat_goals";

export function getLocalGoals(): Goal[] {
  const raw = localStorage.getItem(LOCAL_KEY);

  return raw ? JSON.parse(raw) : [];
}

export function saveLocalGoals(goals: Goal[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(goals));
}
