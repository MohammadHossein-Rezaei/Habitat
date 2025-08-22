import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Add Goal", to: "/add" },
    { label: "Dashboard", to: "/dashboard" },
  ];

  return (
    <header className="bg-white shadow-sm py-4 px-6 mb-6 border-b">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-zinc-800 tracking-tight">
          Habitat
        </h1>

        <nav className="flex gap-4 items-center">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-sm ${
                pathname === item.to
                  ? "text-zinc-900 font-semibold"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
