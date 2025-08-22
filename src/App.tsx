import { BrowserRouter, Route, Routes } from "react-router";
import { GoalProvider } from "./context/GoalContext";
import Home from "./pages/Home";
import AddGoal from "./pages/AddGoal";
import GoalDetails from "./pages/GoalDetails";
import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <GoalProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-zinc-100 text-zinc-800 p-4">
          <Header />
          <h1 className="text-2xl font-bold">Habitat</h1>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<AddGoal />} path="/add" />
            <Route element={<GoalDetails />} path="/goal/:id" />
            <Route element={<Dashboard />} path="/dashboard" />
          </Routes>
        </div>
      </BrowserRouter>
    </GoalProvider>
  );
}

export default App;
