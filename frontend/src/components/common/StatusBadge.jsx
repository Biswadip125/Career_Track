const statusStyles = {
  Applied: "bg-blue-50 text-blue-700",
  Shortlisted: "bg-violet-50 text-violet-700",
  Interview: "bg-amber-50 text-amber-700",
  Offer: "bg-emerald-50 text-emerald-700",
  Rejected: "bg-rose-50 text-rose-700",
  Withdrawn: "bg-gray-100 text-gray-600",
};
function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
        statusStyles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
