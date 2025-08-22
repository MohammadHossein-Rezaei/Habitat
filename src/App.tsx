import { BrowserRouter } from "react-router";
import { GoalProvider } from "./context/GoalContext";
import Header from "./components/layout/Header";
import Routing from "./routes/routing";

function App() {
  return (
    <GoalProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-zinc-50 text-zinc-900 px-6 py-4 font-sans tracking-tight">
          <Header />
          <h1 className="text-3xl font-semibold mb-6">Habitat</h1>
          <Routing />
        </div>
      </BrowserRouter>
    </GoalProvider>
  );
}

export default App;
