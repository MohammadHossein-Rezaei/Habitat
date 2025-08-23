import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoalContext } from "../context/GoalContext";
import Button from "../components/common/Button";
import { v4 as uuidv4 } from "uuid";
import type { Goal } from "../types/habit";
import Input from "../components/common/Input";

export default function AddGoal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { addGoal } = useGoalContext();
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newGoal: Goal = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      habits: [],
      deadline,
    };

    addGoal(newGoal);
    navigate("/", { replace: true });
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-6 rounded-lg shadow border border-zinc-200">
      <h2 className="text-xl font-medium text-zinc-900 mb-6 tracking-tight">
        Add New Goal
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-zinc-700 mb-1"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Become an early riser"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-zinc-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm"
            placeholder="Optional"
          />
        </div>

        <div>
          <label
            htmlFor="deadline"
            className="block text-sm font-medium text-zinc-700 mb-1"
          >
            Deadline
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit">Save Goal</Button>
        </div>
      </form>
    </div>
  );
}
