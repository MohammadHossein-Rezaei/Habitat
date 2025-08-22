// Routing.js
import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import AddGoal from "../pages/AddGoal";
import GoalDetails from "../pages/GoalDetails";
import Dashboard from "../pages/Dashboard";

function Routing() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<AddGoal />} path="/add" />
      <Route element={<GoalDetails />} path="/goal/:id" />
      <Route element={<Dashboard />} path="/dashboard" />
    </Routes>
  );
}

export default Routing;
