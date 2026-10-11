import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  FileText,
  Globe,
  MapPin,
  Send,
} from "lucide-react";
import api from "../services/api";
import { createApplication } from "../services/applicationService";
import ApplicationForm from "../components/forms/ApplicationForm";

const AddApplication = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event, formData) => {
    event.preventDefault();
    setError("");

    if (
      !formData.company.trim() ||
      !formData.position.trim() ||
      !formData.location.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      await createApplication(formData);

      navigate("/dashboard", {
        state: { message: "Application added successfully." },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to add application. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navigation */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <BriefcaseBusiness size={20} />
            </span>
            CareerTrack
          </Link>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to dashboard</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
            <CheckCircle2 size={14} />
            Keep your job search organized
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Add application
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Record a new job opportunity and keep track of your application
            progress in one place.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          {/* Application form */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-7 flex items-center gap-3 border-b border-gray-100 pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FileText size={21} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">Job details</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Fields marked with * are required.
                </p>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <ApplicationForm
              onSubmit={handleSubmit}
              loading={loading}
              submitLabel="Add Application"
            />
          </section>

          {/* Helpful sidebar */}
          <aside className="space-y-5">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                <CheckCircle2 size={20} />
              </div>

              <h3 className="font-semibold text-gray-900">Stay organized</h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Keep your application details accurate so your dashboard
                reflects your actual job search progress.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900">Quick tips</h3>

              <ul className="mt-4 space-y-4 text-sm text-gray-600">
                <li className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-semibold">
                    1
                  </span>
                  <span>
                    Use the exact company and position names to make searching
                    easier.
                  </span>
                </li>

                <li className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-semibold">
                    2
                  </span>
                  <span>
                    Update the status whenever you hear back from the employer.
                  </span>
                </li>

                <li className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-semibold">
                    3
                  </span>
                  <span>
                    Add notes to remember interview rounds and follow-up dates.
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default AddApplication;
