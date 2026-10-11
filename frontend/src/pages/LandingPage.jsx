import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  LayoutDashboard,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: BriefcaseBusiness,
    title: "Track every application",
    description:
      "Keep all your job applications in one place. No more scattered spreadsheets or forgotten opportunities.",
  },
  {
    icon: BarChart3,
    title: "Visualize your progress",
    description:
      "Understand your job search with clear statistics, application trends, and status breakdowns.",
  },
  {
    icon: Clock3,
    title: "Stay organized",
    description:
      "Keep company details, job links, application dates, and personal notes easy to find.",
  },
];

const steps = [
  {
    number: "01",
    title: "Add your applications",
    description:
      "Save the companies and roles you apply for in just a few clicks.",
  },
  {
    number: "02",
    title: "Track every update",
    description:
      "Update application statuses as you hear back from recruiters.",
  },
  {
    number: "03",
    title: "Measure your progress",
    description:
      "Use your dashboard to understand your activity and stay motivated.",
  },
];

const demoApplications = [
  {
    company: "Google",
    role: "Frontend Developer",
    date: "Oct 08, 2026",
    status: "Interview",
    color: "bg-blue-100 text-blue-700",
    initials: "G",
  },
  {
    company: "Microsoft",
    role: "Software Engineer",
    date: "Oct 06, 2026",
    status: "Shortlisted",
    color: "bg-purple-100 text-purple-700",
    initials: "M",
  },
  {
    company: "Stripe",
    role: "Full Stack Developer",
    date: "Oct 04, 2026",
    status: "Applied",
    color: "bg-amber-100 text-amber-700",
    initials: "S",
  },
];

function DashboardPreview() {
  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="absolute -inset-5 rounded-[2rem] bg-indigo-200/30 blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-indigo-950/10">
        {/* Browser header */}
        <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />

          <div className="ml-4 hidden items-center gap-2 rounded-lg bg-slate-50 px-4 py-2 text-xs text-slate-400 sm:flex">
            <ShieldCheck size={14} />
            careertrack.app/dashboard
          </div>
        </div>

        <div className="grid min-h-[420px] md:grid-cols-[180px_1fr]">
          {/* Preview sidebar */}
          <aside className="hidden border-r border-slate-100 bg-slate-50/70 p-4 md:block">
            <div className="mb-8 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <BriefcaseBusiness size={17} />
              </div>
              <span className="font-bold text-slate-900">CareerTrack</span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3 rounded-lg bg-indigo-50 px-3 py-2.5 font-medium text-indigo-700">
                <LayoutDashboard size={16} />
                Dashboard
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 text-slate-500">
                <BriefcaseBusiness size={16} />
                Applications
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 text-slate-500">
                <BarChart3 size={16} />
                Statistics
              </div>
            </div>

            <div className="mt-12 rounded-xl border border-indigo-100 bg-white p-3">
              <Sparkles size={18} className="text-indigo-600" />
              <p className="mt-3 text-xs font-semibold text-slate-800">
                Keep going!
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Every application brings you closer to your next role.
              </p>
            </div>
          </aside>

          {/* Preview dashboard content */}
          <div className="min-w-0 p-4 sm:p-6 md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-indigo-600">
                  YOUR OVERVIEW
                </p>
                <h3 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                  Welcome back!
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Here is how your job search is going.
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                Y
              </div>
            </div>

            {/* Stat cards */}
            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                {
                  label: "Applications",
                  value: "24",
                  icon: BriefcaseBusiness,
                  color: "text-indigo-600 bg-indigo-50",
                },
                {
                  label: "Interviews",
                  value: "06",
                  icon: Target,
                  color: "text-amber-600 bg-amber-50",
                },
                {
                  label: "Offers",
                  value: "02",
                  icon: CircleDollarSign,
                  color: "text-green-600 bg-green-50",
                },
                {
                  label: "Response rate",
                  value: "33%",
                  icon: TrendingUp,
                  color: "text-purple-600 bg-purple-50",
                },
              ].map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-slate-100 p-3 sm:p-4"
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.color}`}
                    >
                      <Icon size={16} />
                    </div>
                    <p className="mt-3 text-xl font-bold text-slate-900 sm:text-2xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Activity chart and status */}
            <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
              <div className="rounded-xl border border-slate-100 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">
                      Application activity
                    </h4>
                    <p className="mt-1 text-xs text-slate-400">
                      Applications over six months
                    </p>
                  </div>
                  <BarChart3 size={18} className="text-indigo-500" />
                </div>

                <div className="mt-5 flex h-28 items-end justify-around gap-3">
                  {[35, 56, 42, 76, 60, 90].map((height, index) => (
                    <div
                      key={index}
                      className="flex h-full flex-1 flex-col justify-end"
                    >
                      <div
                        className={`w-full rounded-t-md ${
                          index === 5 ? "bg-indigo-600" : "bg-indigo-200"
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-2 flex justify-around text-xs text-slate-400">
                  {["May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((month) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 p-4">
                <h4 className="text-sm font-semibold text-slate-800">
                  Application status
                </h4>
                <p className="mt-1 text-xs text-slate-400">
                  Your current pipeline
                </p>

                <div className="mt-4 flex items-center gap-4">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#4f46e5_0%_45%,#a78bfa_45%_68%,#fbbf24_68%_85%,#86efac_85%_100%)]">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-lg font-bold text-slate-800">
                      24
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    {[
                      ["bg-indigo-600", "Applied"],
                      ["bg-violet-400", "Interview"],
                      ["bg-amber-400", "Shortlisted"],
                      ["bg-green-300", "Offers"],
                    ].map(([color, label]) => (
                      <div key={label} className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${color}`} />
                        <span className="text-slate-500">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent applications */}
            <div className="mt-4 rounded-xl border border-slate-100 p-4">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-semibold text-slate-800">
                  Recent applications
                </h4>
                <span className="text-xs font-medium text-indigo-600">
                  Preview
                </span>
              </div>

              <div className="mt-3 divide-y divide-slate-100">
                {demoApplications.map((application) => (
                  <div
                    key={application.company}
                    className="flex items-center gap-3 py-3"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-700">
                      {application.initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-slate-800">
                        {application.company}
                      </p>
                      <p className="mt-1 truncate text-xs text-slate-400">
                        {application.role}
                      </p>
                    </div>

                    <span
                      className={`hidden rounded-full px-2.5 py-1 text-xs font-medium sm:inline-flex ${application.color}`}
                    >
                      {application.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* Navigation */}
      <header className="relative z-20 border-b border-slate-100 bg-white/90">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
              <BriefcaseBusiness size={21} />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Career<span className="text-indigo-600">Track</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
            >
              How it works
            </a>
            <a
              href="#dashboard"
              className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
            >
              Dashboard
            </a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-slate-100 bg-white px-5 py-4 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              <a
                href="#features"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                How it works
              </a>
              <a
                href="#dashboard"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Dashboard
              </a>
              <Link
                to="/login"
                className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="mt-2 rounded-lg bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Get Started for Free
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="relative px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24 lg:px-10 lg:pt-28">
          <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-100/60 blur-[100px]" />

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-xs font-semibold text-indigo-700 shadow-sm sm:text-sm">
              <Sparkles size={15} />
              YOUR JOB SEARCH, ORGANIZED
              <ChevronRight size={14} />
            </div>

            <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-bold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl">
              Land your next role,
              <span className="mt-2 block text-indigo-600">
                without losing track.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Your job search deserves better than scattered spreadsheets. Track
              applications, manage interviews, and see your progress in one
              simple workspace.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700"
              >
                Get Started for Free
                <ArrowRight size={17} />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50/50"
              >
                Explore Features
                <ChevronRight size={17} />
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500 sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-green-600" />
                Simple to use
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-green-600" />
                Your applications in one place
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-green-600" />
                Clear progress tracking
              </span>
            </div>
          </div>
        </section>

        {/* Dashboard preview */}
        <section
          id="dashboard"
          className="px-4 pb-20 sm:px-8 sm:pb-24 lg:px-10"
        >
          <div className="mx-auto max-w-6xl">
            <DashboardPreview />
            <p className="mt-5 text-center text-xs text-slate-400 sm:text-sm">
              A preview of your job search workspace
            </p>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="border-y border-slate-100 bg-slate-50/70 px-5 py-20 sm:px-8 sm:py-24 lg:px-10"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                Everything in one place
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                A smarter way to manage your job search
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Spend less time organizing your search and more time preparing
                for the opportunities ahead.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="group rounded-2xl border border-slate-200/80 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-950/5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                      <Icon size={23} />
                    </div>

                    <h3 className="mt-6 text-lg font-bold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                Get started in minutes
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Three steps to a more organized search
              </h2>
            </div>

            <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {steps.map((step, index) => (
                <div key={step.number} className="relative text-center">
                  {index !== steps.length - 1 && (
                    <div className="absolute left-[65%] top-7 hidden h-px w-[70%] bg-indigo-100 md:block" />
                  )}

                  <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-lg font-bold text-indigo-600">
                    {step.number}
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-10">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-indigo-600 px-6 py-14 text-center sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border-[40px] border-white/5" />
            <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full border-[40px] border-white/5" />

            <div className="relative mx-auto max-w-2xl">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                <Target size={25} />
              </div>

              <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Your next opportunity starts here.
              </h2>

              <p className="mt-4 leading-7 text-indigo-100">
                Bring your job search into focus. Keep every application
                organized and move forward with confidence.
              </p>

              <Link
                to="/register"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50"
              >
                Create Your Free Account
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <BriefcaseBusiness size={17} />
            </div>
            <span className="font-bold text-slate-900">
              Career<span className="text-indigo-600">Track</span>
            </span>
          </Link>

          <p className="text-center text-xs text-slate-500 sm:text-sm">
            Built to make your job search more organized.
          </p>

          <div className="flex items-center gap-5 text-sm text-slate-500">
            <Link to="/login" className="transition hover:text-indigo-600">
              Log in
            </Link>
            <Link to="/register" className="transition hover:text-indigo-600">
              Sign up
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-7xl border-t border-slate-100 pt-5 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} CareerTrack. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
