import {
  LayoutDashboard,
  BriefcaseBusiness,
  CalendarDays,
  ChartNoAxesCombined,
  Settings,
  CircleHelp,
  Bell,
  Plus,
  Search,
  ArrowUpRight,
  Menu,
  X,
  MapPin,
  Clock3,
  ExternalLink,
  ChevronDown,
  FileText,
  CheckCircle2,
  LogOut,
} from "lucide-react";
import { useEffect, UseEffect, useState } from "react";
import api from "../services/api";
import { Navigate, useNavigate } from "react-router-dom";
import StatusBadge from "../components/common/StatusBadge";
import StatCard from "../components/common/StatCard";
import { getApplications } from "../services/applicationService";
import Sidebar from "../components/layout/Sidebar";

function ApplicationActivity({ monthlyActivity }) {
  const maxApplications = Math.max(
    ...monthlyActivity.map((item) => item.count),
    1,
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Application Activity
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Applications submitted over the last 6 months
        </p>
      </div>

      <div className="flex h-56 items-end justify-between gap-3">
        {monthlyActivity.map((item) => {
          const barHeight =
            item.count === 0
              ? 4
              : Math.max((item.count / maxApplications) * 100, 8);

          return (
            <div
              key={`${item.year}-${item.month}`}
              className="flex h-full flex-1 flex-col items-center justify-end gap-2"
            >
              <span className="text-xs font-medium text-gray-600">
                {item.count > 0 ? item.count : ""}
              </span>

              <div className="flex h-40 w-full items-end">
                <div
                  className={`w-full rounded-t-md transition-all duration-300 ${
                    item.count > 0 ? "bg-blue-500" : "bg-gray-200"
                  }`}
                  style={{ height: `${barHeight}%` }}
                  title={`${item.count} applications in ${item.month} ${item.year}`}
                />
              </div>

              <span className="text-xs text-gray-500">{item.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ApplicationStatus({ applications }) {
  const statuses = [
    { label: "Applied", count: 0, color: "bg-blue-500" },
    { label: "Interview", count: 0, color: "bg-amber-400" },
    { label: "Rejected", count: 0, color: "bg-rose-400" },
    { label: "In review", count: 0, color: "bg-violet-400" },
    { label: "Offers", count: 0, color: "bg-emerald-500" },
  ].map((item) => ({
    ...item,
    count: applications?.filter((app) => app.status === item.label).length,
  }));

  const total = applications?.length;
  let currentOffset = 0;

  const segments = statuses.map((item) => {
    const percentage = (item.count / total) * 100;
    const segment = `${item.color} ${currentOffset}% ${currentOffset + percentage}%`;
    currentOffset += percentage;
    return { ...item, percentage, segment };
  });

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <h2 className="font-semibold text-slate-900">Application Status</h2>
      <p className="mt-1 text-sm text-slate-500">
        Breakdown of your applications
      </p>

      <div className="mt-7 flex justify-center">
        <div
          className="relative flex h-40 w-40 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(${statuses
              .map((item) => {
                const start =
                  (statuses
                    .slice(0, statuses.indexOf(item))
                    .reduce((sum, entry) => sum + entry.count, 0) /
                    total) *
                  100;
                const end = start + (item.count / total) * 100;
                const colors = {
                  Applied: "#3b82f6",
                  Interview: "#fbbf24",
                  Rejected: "#fb7185",
                  "In review": "#a78bfa",
                  Offers: "#10b981",
                };
                return `${colors[item.label]} ${start}% ${end}%`;
              })
              .join(", ")})`,
          }}
        >
          <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
            <span className="text-3xl font-bold text-slate-900">{total}</span>
            <span className="text-xs text-slate-400">Applications</span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {segments.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5">
              <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
              <span className="text-sm text-slate-600">{item.label}</span>
            </div>
            <span className="text-sm font-semibold text-slate-800">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

const getMonthlyActivity = (applications) => {
  const currentDate = new Date();

  // Get the current month and the previous 5 months
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 5 + index,
      1,
    );

    return {
      month: date.toLocaleDateString("en-US", {
        month: "short",
      }),
      year: date.getFullYear(),
      count: 0,
    };
  });

  applications?.forEach((app) => {
    if (!app.applicationDate) return;

    const applicationDate = new Date(app.applicationDate);

    const matchingMonth = months.find(
      (month) =>
        month.month ===
          applicationDate.toLocaleDateString("en-US", {
            month: "short",
          }) && month.year === applicationDate.getFullYear(),
    );

    if (matchingMonth) {
      matchingMonth.count += 1;
    }
  });

  return months;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All statuses");
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(false);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = `${app.company} ${app.position} ${app.location}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      selectedStatus === "All statuses" || app.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleAddApplication = () => {
    navigate("/applications/new");
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getApplications();

        setApplications(response || []);
      } catch (error) {
        console.log(error);
        setError(
          error.response.data.message || "Failed to load your applications",
        );
      }
    };

    fetchApplications();
  }, []);

  const totalApplications = applications.length;

  const interviewCount = applications.filter(
    (app) => app.status === "Interview",
  ).length;

  const offerCount = applications.filter(
    (app) => app.status === "Offer",
  ).length;

  const responseRate =
    totalApplications === 0
      ? 0
      : Math.round(
          ((totalApplications -
            applications.filter((app) => app.status === "Applied").length) /
            totalApplications) *
            100,
        );

  const stats = [
    {
      label: "Total Applications",
      value: totalApplications,
      icon: BriefcaseBusiness,
      iconStyle: "bg-blue-50 text-blue-600",
      positive: true,
    },
    {
      label: "Interviews",
      value: interviewCount,
      icon: CalendarDays,
      iconStyle: "bg-amber-50 text-amber-600",
      positive: true,
    },
    {
      label: "Offers Received",
      value: offerCount,
      icon: CheckCircle2,
      iconStyle: "bg-emerald-50 text-emerald-600",
      positive: true,
    },
    {
      label: "Response Rate",
      value: responseRate,
      icon: ChartNoAxesCombined,
      iconStyle: "bg-violet-50 text-violet-600",
      positive: true,
    },
  ];

  const monthlyActivity = getMonthlyActivity(applications);

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {menuOpen && (
        <button
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-30 bg-slate-950/30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <Sidebar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        handleLogout={handleLogout}
      />

      <main className="min-w-0 md:ml-64">
        <header className="sticky top-0 z-20 flex h-19 items-center justify-between gap-4 border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open sidebar"
              onClick={() => setMenuOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            >
              <Menu size={21} />
            </button>
            <div>
              <p className="text-sm font-semibold text-slate-800">Workspace</p>
              <p className="text-xs text-slate-400">CareerTrack / Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <button
              aria-label="Notifications"
              className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100"
            >
              <Bell size={20} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>
            <div className="hidden h-8 w-px bg-slate-200 sm:block" />
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
              A
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-indigo-600">
                Friday, October 9, 2026
              </p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Good morning! 👋
              </h1>
              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Here&apos;s what&apos;s happening with your job search.
              </p>
            </div>

            <button
              onClick={handleAddApplication}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.98]"
            >
              <Plus size={19} />
              Add Application
            </button>
          </div>

          <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </section>

          <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.65fr_1fr]">
            <ApplicationActivity monthlyActivity={monthlyActivity} />
            <ApplicationStatus applications={applications} />
          </section>

          <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-center">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Recent Applications
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Keep track of your latest job opportunities.
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveNav("Applications");
                  navigate("/applications");
                }}
                className="inline-flex items-center gap-1 self-start text-sm font-semibold text-indigo-600 hover:text-indigo-800 lg:self-auto"
              >
                View all applications
                <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:px-6">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search company, position or location..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                <option>All statuses</option>
                <option>Applied</option>
                <option>Shortlisted</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
                <option>Withdrawn</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead>
                  <tr className="bg-slate-50/80 text-xs uppercase tracking-wide text-slate-400">
                    <th className="px-6 py-4 font-semibold">Company</th>
                    <th className="px-6 py-4 font-semibold">Position</th>
                    <th className="px-6 py-4 font-semibold">Applied date</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 text-right font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredApplications.map((app) => (
                    <tr
                      key={app._id}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold ${app.color}`}
                          >
                            {app.initials}
                          </div>
                          <span className="text-sm font-semibold text-slate-800">
                            {app.company}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-700">
                          {app.position}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                          <MapPin size={12} />
                          {app.location}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(app.applicationDate).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={app.status} />
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          aria-label={`View ${app.company} application`}
                          title="View application"
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <ExternalLink size={17} />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredApplications.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-sm text-slate-500"
                      >
                        No applications match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-2 border-t border-slate-100 px-6 py-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <span>
                Showing {filteredApplications.length} of {applications.length}{" "}
                sample applications
              </span>
              <span className="flex items-center gap-1">
                <Clock3 size={13} />
                Last updated just now
              </span>
            </div>
          </section>

          <footer className="py-8 text-center text-xs text-slate-400">
            © 2026 CareerTrack. Keep moving forward.
          </footer>
        </div>
      </main>
    </div>
  );
}
