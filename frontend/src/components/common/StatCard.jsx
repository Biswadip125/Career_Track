function StatCard({ stat }) {
  const Icon = stat.icon;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">{stat.label}</p>
        <div className={`rounded-xl p-2.5 ${stat.iconStyle}`}>
          <Icon size={20} />
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-2">
        <h3 className="text-3xl font-bold tracking-tight text-slate-900">
          {stat.value}
        </h3>
      </div>

      <p className="mt-2 text-xs text-slate-400">{stat.description}</p>
    </div>
  );
}
export default StatCard;
