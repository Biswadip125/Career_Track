import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowDownUp,
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChevronDown,
  ExternalLink,
  FileSearch,
  MapPin,
  Menu,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import api from "../services/api";
import { getApplications } from "../services/applicationService";
import Sidebar from "../components/layout/Sidebar";

const statusStyles = {
  Applied: "bg-blue-50 text-blue-700 ring-blue-600/20",
  Shortlisted: "bg-violet-50 text-violet-700 ring-violet-600/20",
  Interview: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Offer: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Rejected: "bg-rose-50 text-rose-700 ring-rose-600/20",
  Withdrawn: "bg-gray-100 text-gray-600 ring-gray-500/20",
};

const statusOptions = [
  "Applied",
  "Shortlisted",
  "Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
];

const formatDate = (date) => {
  if (!date) return "Not specified";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
        statusStyles[status] || "bg-gray-100 text-gray-600 ring-gray-500/20"
      }`}
    >
      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function ApplicationRow({ application, onDelete, deletingId }) {
  const navigate = useNavigate();

  const companyInitial =
    application.company?.trim()?.charAt(0)?.toUpperCase() || "?";

  return (
    <tr className="transition hover:bg-gray-50/80">
      <td className="px-5 py-4 sm:px-6">
        <div className="flex min-w-48 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-blue-50 text-sm font-bold text-blue-700">
            {companyInitial}
          </div>

          <div className="min-w-0">
            <p className="truncate font-semibold text-gray-900">
              {application.company}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
              <MapPin size={12} />
              <span className="truncate">
                {application.location || "Location not specified"}
              </span>
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4 sm:px-6">
        <p className="min-w-36 font-medium text-gray-800">
          {application.position}
        </p>
        <p className="mt-1 text-xs capitalize text-gray-500">
          {(application.jobType || "full-time").replace("-", " ")}
        </p>
      </td>

      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600 sm:px-6">
        <div className="flex items-center gap-2">
          <CalendarDays size={15} className="text-gray-400" />
          {formatDate(application.applicationDate)}
        </div>
      </td>

      <td className="whitespace-nowrap px-5 py-4 sm:px-6">
        <StatusBadge status={application.status} />
      </td>

      <td className="px-5 py-4 sm:px-6">
        <div className="flex items-center justify-end gap-2">
          {application.jobUrl && (
            <a
              href={application.jobUrl}
              target="_blank"
              rel="noreferrer"
              title="Open job posting"
              aria-label={`Open job posting for ${application.company}`}
              className="rounded-lg p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-600"
            >
              <ExternalLink size={17} />
            </a>
          )}

          <button
            type="button"
            onClick={() => navigate(`/applications/${application._id}`)}
            title="View application"
            aria-label={`View ${application.company} application`}
            className="rounded-lg px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            View
          </button>

          <button
            type="button"
            onClick={() => onDelete(application)}
            disabled={deletingId === application._id}
            title="Delete application"
            aria-label={`Delete ${application.company} application`}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

const Applications = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [typeFilter, setTypeFilter] = useState("All types");
  const [sortOrder, setSortOrder] = useState("newest");
  const [deletingId, setDeletingId] = useState(null);
  const [applicationToDelete, setApplicationToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getApplications();
        setApplications(response ?? []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load applications. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return [...applications]
      .filter((application) => {
        const matchesSearch =
          !query ||
          [
            application.company,
            application.position,
            application.location,
            application.status,
          ].some((value) => value?.toLowerCase().includes(query));

        const matchesStatus =
          statusFilter === "All statuses" ||
          application.status === statusFilter;

        const matchesType =
          typeFilter === "All types" || application.jobType === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
      })
      .sort((a, b) => {
        const dateA = new Date(a.applicationDate || a.createdAt || 0).getTime();

        const dateB = new Date(b.applicationDate || b.createdAt || 0).getTime();

        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [applications, search, statusFilter, typeFilter, sortOrder]);

  const statusCounts = useMemo(() => {
    return {
      total: applications.length,
      Applied: applications.filter((app) => app.status === "Applied").length,
      Interview: applications.filter((app) => app.status === "Interview")
        .length,
      Offer: applications.filter((app) => app.status === "Offer").length,
    };
  }, [applications]);

  const handleDelete = async () => {
    if (!applicationToDelete) return;

    try {
      setDeletingId(applicationToDelete._id);
      setDeleteError("");

      await api.delete(`/applications/${applicationToDelete._id}`);

      setApplications((previous) =>
        previous.filter((app) => app._id !== applicationToDelete._id),
      );

      setApplicationToDelete(null);
    } catch (err) {
      setDeleteError(
        err.response?.data?.message ||
          "Unable to delete this application. Please try again.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All statuses");
    setTypeFilter("All types");
    setSortOrder("newest");
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    statusFilter !== "All statuses" ||
    typeFilter !== "All types";

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        {menuOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-30 bg-gray-950/40 md:hidden"
          />
        )}

        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 justify-center items-center">
            <button
              aria-label="Open sidebar"
              onClick={() => setMenuOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            >
              <Menu size={21} />
            </button>
            <Link
              to="/dashboard"
              className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-gray-900"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                <BriefcaseBusiness size={20} />
              </span>
              CareerTrack
            </Link>
          </div>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
        </div>
      </header>
      <div className="min-h-screen bg-gray-50">
        <Sidebar
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          handleLogout={handleLogout}
        />

        <main className="min-h-screen min-w-0 md:ml-64 px-4 py-8 sm:px-6 lg:px-8">
          {/* Page title */}

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-medium text-blue-600">
                YOUR JOB SEARCH
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                All Applications
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
                Manage and track every opportunity in your job search.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/applications/new")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus size={18} />
              Add application
            </button>
          </div>

          {/* Summary cards */}
          <div className="mt-8 grid grid-cols-2 gap-4 xl:grid-cols-4">
            {[
              {
                label: "Total applications",
                value: statusCounts.total,
                icon: BriefcaseBusiness,
                color: "bg-blue-50 text-blue-600",
              },
              {
                label: "Applied",
                value: statusCounts.Applied,
                icon: FileSearch,
                color: "bg-sky-50 text-sky-600",
              },
              {
                label: "Interviews",
                value: statusCounts.Interview,
                icon: CalendarDays,
                color: "bg-amber-50 text-amber-600",
              },
              {
                label: "Offers",
                value: statusCounts.Offer,
                icon: Building2,
                color: "bg-emerald-50 text-emerald-600",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-gray-500">
                      {item.label}
                    </p>

                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                    >
                      <Icon size={19} />
                    </span>
                  </div>

                  <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Applications list */}
          <section className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-5 sm:p-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Your applications
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Showing {filteredApplications.length} of{" "}
                    {applications.length} applications
                  </p>
                </div>

                <div className="relative w-full sm:max-w-xs">
                  <Search
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search company, role..."
                    aria-label="Search applications"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    aria-label="Filter by status"
                    className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-3.5 pr-9 text-sm text-gray-700 outline-none focus:border-blue-500 sm:w-auto"
                  >
                    <option>All statuses</option>
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>

                <div className="relative">
                  <select
                    value={typeFilter}
                    onChange={(event) => setTypeFilter(event.target.value)}
                    aria-label="Filter by employment type"
                    className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-3.5 pr-9 text-sm text-gray-700 outline-none focus:border-blue-500 sm:w-auto"
                  >
                    <option value="All types">All job types</option>
                    <option value="full-time">Full-time</option>
                    <option value="internship">Internship</option>
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSortOrder((previous) =>
                      previous === "newest" ? "oldest" : "newest",
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
                >
                  <ArrowDownUp size={15} />
                  {sortOrder === "newest" ? "Newest first" : "Oldest first"}
                </button>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                  >
                    <X size={15} />
                    Clear filters
                  </button>
                )}
              </div>
            </div>

            {/* Table */}
            {loading ? (
              <div className="flex min-h-64 flex-col items-center justify-center gap-3 px-6 text-center">
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-blue-100 border-t-blue-600" />
                <p className="text-sm text-gray-500">
                  Loading your applications...
                </p>
              </div>
            ) : error ? (
              <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
                <p role="alert" className="text-sm text-rose-600">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Try again
                </button>
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
                  <FileSearch size={25} />
                </div>

                <h3 className="mt-5 font-semibold text-gray-900">
                  {applications.length === 0
                    ? "No applications yet"
                    : "No matching applications"}
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                  {applications.length === 0
                    ? "Start tracking your job search by adding your first application."
                    : "Try a different search term or change your filters."}
                </p>

                {applications.length === 0 ? (
                  <button
                    type="button"
                    onClick={() => navigate("/applications/new")}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    <Plus size={17} />
                    Add your first application
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 rounded-lg px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left">
                  <thead className="border-b border-gray-100 bg-gray-50/80">
                    <tr className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      <th className="px-5 py-4 sm:px-6">Company</th>
                      <th className="px-5 py-4 sm:px-6">Position</th>
                      <th className="px-5 py-4 sm:px-6">Applied on</th>
                      <th className="px-5 py-4 sm:px-6">Status</th>
                      <th className="px-5 py-4 text-right sm:px-6">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filteredApplications.map((application) => (
                      <ApplicationRow
                        key={application._id}
                        application={application}
                        onDelete={setApplicationToDelete}
                        deletingId={deletingId}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!loading && !error && filteredApplications.length > 0 && (
              <div className="flex flex-col gap-2 border-t border-gray-100 bg-gray-50/50 px-5 py-4 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <span>
                  {filteredApplications.length}{" "}
                  {filteredApplications.length === 1
                    ? "application"
                    : "applications"}{" "}
                  displayed
                </span>
                <span>Sorted by application date</span>
              </div>
            )}
          </section>
        </main>
      </div>
      {/* Delete confirmation modal */}
      {applicationToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !deletingId) {
              setApplicationToDelete(null);
              setDeleteError("");
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <Trash2 size={21} />
            </div>

            <h2
              id="delete-title"
              className="mt-4 text-lg font-semibold text-gray-900"
            >
              Delete application?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Are you sure you want to delete your application to{" "}
              <strong className="text-gray-800">
                {applicationToDelete.company}
              </strong>
              ? This action cannot be undone.
            </p>

            {deleteError && (
              <p role="alert" className="mt-3 text-sm text-rose-600">
                {deleteError}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={Boolean(deletingId)}
                onClick={() => {
                  setApplicationToDelete(null);
                  setDeleteError("");
                }}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={Boolean(deletingId)}
                className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingId ? "Deleting..." : "Delete application"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
