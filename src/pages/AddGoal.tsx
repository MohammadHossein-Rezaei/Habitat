import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoalContext } from "../context/GoalContext";
import Button from "../components/common/Button";
import { v4 as uuidv4 } from "uuid";
import type { Goal } from "../types/habit";

export default function AddGoal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { addGoal } = useGoalContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newGoal: Goal = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      habits: [],
    };

    addGoal(newGoal);
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow-sm border border-zinc-200">
      <h2 className="text-lg font-semibold text-zinc-800 mb-4">Add New Goal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm text-zinc-600 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm"
            placeholder="e.g. Become an early riser"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm text-zinc-600 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm"
            placeholder="Optional"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save Goal</Button>
        </div>
      </form>
    </div>
  );
}
