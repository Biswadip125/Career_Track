import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  BriefcaseBusiness,
  MapPin,
  CalendarDays,
  Globe,
  Send,
} from "lucide-react";

const initialValues = {
  company: "",
  position: "",
  location: "",
  jobType: "full-time",
  status: "Applied",
  applicationDate: new Date().toISOString().split("T")[0],
  jobUrl: "",
  notes: "",
};

const ApplicationForm = ({
  initialData = {},
  onSubmit,
  loading = false,
  submitLabel = "Save application",
  cancelTo = "/dashboard",
}) => {
  const [formData, setFormData] = useState(() => ({
    ...initialValues,
    ...initialData,
    applicationDate: initialData.applicationDate
      ? new Date(initialData.applicationDate).toISOString().split("T")[0]
      : initialValues.applicationDate,
  }));

  const labelClass = "mb-2 block text-sm font-medium text-gray-700";

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    onSubmit(e, formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Company and position */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className={labelClass}>
            Company name *
          </label>

          <div className="relative">
            <Building2
              size={17}
              className="absolute left-3.5 inset-y-4 text-gray-400"
            />
            <input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Google"
              className={`${inputClass} pl-10`}
              required
              maxLength={100}
            />
          </div>
        </div>

        <div>
          <label htmlFor="position" className={labelClass}>
            Job position *
          </label>

          <div className="relative">
            <BriefcaseBusiness
              size={17}
              className="absolute left-3.5 inset-y-4 text-gray-400"
            />
            <input
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="e.g. Software Engineer"
              className={`${inputClass} pl-10`}
              required
              maxLength={100}
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className={labelClass}>
          Job location *
        </label>

        <div className="relative ">
          <MapPin
            size={17}
            className="absolute left-3.5 inset-y-4 text-gray-400"
          />
          <input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Bengaluru, India or Remote"
            className={`${inputClass} pl-10`}
            required
            maxLength={100}
          />
        </div>
      </div>

      {/* Job type and status */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="jobType" className={labelClass}>
            Employment type *
          </label>

          <select
            id="jobType"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className={inputClass}
            required
          >
            <option value="full-time">Full-time</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className={labelClass}>
            Application status *
          </label>

          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={inputClass}
            required
          >
            <option value="Applied">Applied</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
            <option value="Withdrawn">Withdrawn</option>
          </select>
        </div>
      </div>

      {/* Application date */}
      <div>
        <label htmlFor="applicationDate" className={labelClass}>
          Application date *
        </label>

        <div className="relative">
          <CalendarDays
            size={17}
            className="absolute left-3.5 inset-y-4 text-gray-400"
          />
          <input
            id="applicationDate"
            type="date"
            name="applicationDate"
            value={formData.applicationDate}
            onChange={handleChange}
            className={`${inputClass} pl-10`}
            required
          />
        </div>
      </div>

      {/* Job URL */}
      <div>
        <label htmlFor="jobUrl" className={labelClass}>
          Job posting URL
        </label>

        <div className="relative">
          <Globe
            size={17}
            className="absolute left-3.5 inset-y-4 text-gray-400"
          />
          <input
            id="jobUrl"
            type="url"
            name="jobUrl"
            value={formData.jobUrl}
            onChange={handleChange}
            placeholder="https://company.com/careers/job"
            className={`${inputClass} pl-10`}
          />
        </div>

        <p className="mt-2 text-xs text-gray-400">
          Save the listing link so you can revisit it later.
        </p>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className={labelClass}>
          Notes
        </label>

        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Add interview details, recruiter contact, or follow-up reminders..."
          rows={4}
          maxLength={2000}
          className={`${inputClass} resize-y`}
        />

        <p className="mt-2 text-right text-xs text-gray-400">
          {formData.notes.length}/2000 characters
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
        <Link
          to={cancelTo}
          className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Cancel
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Saving application...
            </>
          ) : (
            <>
              <Send size={16} />
              {submitLabel}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ApplicationForm;
