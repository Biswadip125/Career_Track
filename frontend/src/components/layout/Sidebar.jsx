import { useNavigate, useLocation } from "react-router-dom";
import {
  BriefcaseBusiness,
  X,
  Settings,
  CircleHelp,
  FileText,
  LogOut,
} from "lucide-react";

function SidebarLink({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
        active
          ? "bg-indigo-50 text-indigo-700"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <Icon size={19} strokeWidth={1.8} />
      {label}
    </button>
  );
}

export default function Sidebar({ menuOpen, setMenuOpen, handleLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      label: "Dashboard",
      icon: BriefcaseBusiness,
      path: "/dashboard",
    },
    {
      label: "Applications",
      icon: FileText,
      path: "/applications",
    },
  ];

  const isActive = (item) =>
    item.path === "/applications"
      ? location.pathname === "/applications" ||
        location.pathname.startsWith("/applications/")
      : location.pathname === item.path;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white px-4 py-6 transition-transform duration-200 md:translate-x-0 ${
        menuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center gap-3 px-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200">
          <BriefcaseBusiness size={22} />
        </div>

        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900">
            CareerTrack
          </h1>
          <p className="text-xs text-slate-400">Your career, organized.</p>
        </div>

        <button
          className="ml-auto rounded-lg p-2 text-slate-500 md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      <div className="mt-10 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Workspace
      </div>

      <nav className="mt-3 space-y-1">
        {navItems.map((item) => (
          <SidebarLink
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={isActive(item)}
            onClick={() => {
              navigate(item.path);
              setMenuOpen(false);
            }}
          />
        ))}
      </nav>

      <div className="mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Preferences
      </div>

      <nav className="mt-3 space-y-1">
        <SidebarLink
          icon={Settings}
          label="Settings"
          active={location.pathname === "/settings"}
          onClick={() => {
            navigate("/settings");
            setMenuOpen(false);
          }}
        />

        <SidebarLink
          icon={CircleHelp}
          label="Help Center"
          active={location.pathname === "/help"}
          onClick={() => {
            navigate("/help");
            setMenuOpen(false);
          }}
        />
      </nav>

      <div className="mt-auto rounded-2xl bg-indigo-50 p-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
          <FileText size={18} />
        </div>

        <p className="mt-3 text-sm font-semibold text-slate-800">Keep going!</p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          Every application brings you one step closer to your next opportunity.
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="mt-5 flex w-full items-center gap-3 border-t border-slate-100 px-2 pt-5 text-left transition hover:opacity-75"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
          <LogOut size={18} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-800">
            Logout
          </p>
          <p className="truncate text-xs text-slate-400">
            Sign out of your account
          </p>
        </div>

        <LogOut size={16} className="text-slate-400" />
      </button>
    </aside>
  );
}
