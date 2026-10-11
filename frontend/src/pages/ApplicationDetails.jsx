import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  ExternalLink,
  FileText,
  Globe,
  LoaderCircle,
  MapPin,
  Pencil,
  Save,
  Trash2,
  X,
} from "lucide-react";
import api from "../services/api";
import {
  deleteApplication,
  getApplicationById,
  updateApplication,
} from "../services/applicationService";
import Sidebar from "../components/layout/Sidebar";
import ApplicationForm from "../components/forms/ApplicationForm";

const statusOptions = [
  "Applied",
  "Shortlisted",
  "Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
];

const statusStyles = {
  Applied: "bg-blue-50 text-blue-700 ring-blue-600/20",
  Shortlisted: "bg-violet-50 text-violet-700 ring-violet-600/20",
  Interview: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Offer: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Rejected: "bg-rose-50 text-rose-700 ring-rose-600/20",
  Withdrawn: "bg-gray-100 text-gray-600 ring-gray-500/20",
};

const formatDate = (date) => {
  if (!date) return "Not provided";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    jobType: "full-time",
    jobUrl: "",
    status: "Applied",
    applicationDate: "",
    notes: "",
  });

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getApplicationById(id);
        const data = response.data.application;

        if (!data) {
          setError("Application details were not found.");
          return;
        }

        setApplication(data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Unable to load this application.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleSave = async (event, formData) => {
    event.preventDefault();
    setFormError("");
    setSuccessMessage("");

    if (
      !formData.company.trim() ||
      !formData.position.trim() ||
      !formData.location.trim()
    ) {
      setFormError("Company, position, and location are required.");
      return;
    }

    try {
      setSaving(true);

      const response = await updateApplication(id, formData);

      const updatedApplication =
        response.data.application ?? response.data.updatedApplication;

      if (updatedApplication) {
        setApplication(updatedApplication);
      } else {
        // If your controller returns a different response shape,
        // reload the saved record to keep the UI in sync.
        const refreshed = await api.get(`/applications/${id}`);
        setApplication(refreshed.data.application);
      }

      setEditing(false);
      setSuccessMessage("Application updated successfully.");
    } catch (err) {
      setFormError(
        err.response?.data?.message ||
          "Unable to save changes. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    if (!application) return;

    setEditing(false);
    setFormError("");
    setSuccessMessage("");
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete the application for ${application.company}? This action cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setFormError("");

      await deleteApplication(id);

      navigate("/applications", {
        state: { message: "Application deleted successfully." },
      });
    } catch (err) {
      setFormError(
        err.response?.data?.message || "Unable to delete this application.",
      );
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-gray-50">
        <LoaderCircle size={32} className="animate-spin text-blue-600" />
        <p className="text-sm text-gray-500">Loading application details...</p>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
          <FileText size={28} />
        </div>

        <h1 className="mt-5 text-xl font-bold text-gray-900">
          Application not found
        </h1>

        <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
          {error ||
            "This application may have been deleted or may no longer be available."}
        </p>

        <Link
          to="/applications"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <ArrowLeft size={16} />
          Back to applications
        </Link>
      </div>
    );
  }

  const companyInitial =
    application.company?.trim()?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/dashboard"
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-gray-900"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <BriefcaseBusiness size={20} />
            </span>
            CareerTrack
          </Link>

          <Link
            to="/applications"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">All applications</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/applications" className="transition hover:text-blue-600">
            Applications
          </Link>
          <span>/</span>
          <span className="max-w-48 truncate text-gray-900">
            {application.company}
          </span>
        </nav>

        {/* Page heading */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-blue-50 text-xl font-bold text-blue-700">
              {companyInitial}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="break-words text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {application.position}
                </h1>

                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
                    statusStyles[application.status] ||
                    "bg-gray-100 text-gray-600 ring-gray-500/20"
                  }`}
                >
                  {application.status}
                </span>
              </div>

              <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1.5 font-medium text-gray-700">
                  <Building2 size={15} />
                  {application.company}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={15} />
                  {application.location}
                </span>
              </p>

              <p className="mt-3 text-sm text-gray-500">
                Applied on {formatDate(application.applicationDate)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {!editing ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(true);
                    setSuccessMessage("");
                    setFormError("");
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                >
                  <Pencil size={16} />
                  Edit application
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                <X size={16} />
                Cancel editing
              </button>
            )}
          </div>
        </div>

        {/* Notifications */}
        {successMessage && (
          <div
            role="status"
            className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
          >
            <Check size={17} />
            {successMessage}
          </div>
        )}

        {formError && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          >
            {formError}
          </div>
        )}

        {/* Main layout */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Main information */}
          <div className="space-y-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FileText size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">
                    Application information
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Details about this job opportunity
                  </p>
                </div>
              </div>

              {editing ? (
                <ApplicationForm
                  initialData={application}
                  onSubmit={handleSave}
                  loading={loading}
                  submitLabel="Save Changes"
                />
              ) : (
                <div className="mt-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="mt-2 font-medium text-gray-900">
                        {application.company}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Position</p>
                      <p className="mt-2 font-medium text-gray-900">
                        {application.position}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="mt-2 flex items-center gap-2 font-medium text-gray-900">
                        <MapPin size={16} className="text-gray-400" />
                        {application.location || "Not provided"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Employment type</p>
                      <p className="mt-2 font-medium capitalize text-gray-900">
                        {(application.jobType || "full-time").replace("-", " ")}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Application date</p>
                      <p className="mt-2 flex items-center gap-2 font-medium text-gray-900">
                        <CalendarDays size={16} className="text-gray-400" />
                        {formatDate(application.applicationDate)}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Current status</p>
                      <div className="mt-2">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
                            statusStyles[application.status] ||
                            "bg-gray-100 text-gray-600 ring-gray-500/20"
                          }`}
                        >
                          {application.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 border-t border-gray-100 pt-6">
                    <p className="text-sm text-gray-500">Job posting</p>

                    {application.jobUrl ? (
                      <a
                        href={application.jobUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex max-w-full items-center gap-2 break-all text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        <Globe size={16} className="shrink-0" />
                        <span className="break-all">{application.jobUrl}</span>
                        <ExternalLink size={14} className="shrink-0" />
                      </a>
                    ) : (
                      <p className="mt-2 text-sm text-gray-400">
                        No job posting URL added.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </section>

            {/* Notes */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <FileText size={20} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-gray-900">
                      Notes and reminders
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Personal notes for this application
                    </p>
                  </div>
                </div>

                {!editing && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(true);
                      setSuccessMessage("");
                      setFormError("");
                    }}
                    className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-blue-600"
                    title="Edit notes"
                    aria-label="Edit application notes"
                  >
                    <Pencil size={16} />
                  </button>
                )}
              </div>

              {editing ? (
                <p className="mt-5 text-sm leading-6 text-gray-500">
                  Edit your notes in the Application information form above.
                </p>
              ) : application.notes?.trim() ? (
                <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-gray-700">
                  {application.notes}
                </p>
              ) : (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-gray-400">
                    <FileText size={22} />
                  </div>

                  <p className="mt-3 text-sm font-medium text-gray-700">
                    No notes added yet
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Record useful details about your application.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setEditing(true);
                      setSuccessMessage("");
                      setFormError("");
                    }}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                  >
                    <Pencil size={15} />
                    Add notes
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-gray-900">
                Application status
              </h2>

              <div className="mt-4 flex items-start gap-3 rounded-xl bg-gray-50 p-4">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-gray-600 shadow-sm">
                  <Clock3 size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {application.status}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {application.status === "Offer"
                      ? "Congratulations! An offer has been recorded."
                      : application.status === "Interview"
                        ? "You have an interview stage recorded."
                        : application.status === "Rejected"
                          ? "This application was marked as rejected."
                          : application.status === "Withdrawn"
                            ? "You marked this application as withdrawn."
                            : application.status === "Shortlisted"
                              ? "This application has been shortlisted."
                              : "Keep this status updated as you hear back."}
                  </p>
                </div>
              </div>

              {!editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(true);
                    setSuccessMessage("");
                    setFormError("");
                  }}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  <Pencil size={15} />
                  Update status
                </button>
              )}
            </section>

            <section className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                <BriefcaseBusiness size={20} />
              </div>

              <h2 className="mt-4 font-semibold text-gray-900">
                Keep moving forward
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Track your progress and keep your application details up to date
                throughout your job search.
              </p>

              {application.jobUrl && (
                <a
                  href={application.jobUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
                >
                  View job posting
                  <ExternalLink size={15} />
                </a>
              )}
            </section>

            {application.createdAt && (
              <section className="rounded-2xl border border-gray-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Record information
                </p>

                <div className="mt-4">
                  <p className="text-sm text-gray-500">Added to CareerTrack</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {formatDate(application.createdAt)}
                  </p>
                </div>

                {application.updatedAt && (
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <p className="text-sm text-gray-500">Last updated</p>
                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {formatDate(application.updatedAt)}
                    </p>
                  </div>
                )}
              </section>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ApplicationDetails;
