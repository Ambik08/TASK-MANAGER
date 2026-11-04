
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { getTasks } from "../api";

function dueLabel(value) {
  if (!value) return "No due date";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "No due date"
    : date.toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short",
      });
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  async function loadTasks() {
    setLoading(true);
    setError("");

    try {
      const data = await getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Unable to load tasks.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  const visibleTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    });
  }, [tasks, filter]);

  return (
    <div className="min-h-screen bg-[#3155C8]">
      <Navbar />

      <main className="mx-auto min-h-[calc(100vh-64px)] max-w-6xl px-5 py-12 sm:px-8">

        {/* Page Heading */}
        <div className="mb-10 flex animate-[fadeIn_0.5s_ease-out] flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              My Tasks
            </h1>

            <p className="mt-2 text-sm text-blue-100">
              Manage your tasks in one place.
            </p>
          </div>

          <Link
            to="/tasks/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#3155C8] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-95"
          >
            <span className="text-lg">+</span>
            Create Task
          </Link>
        </div>

        
        <div className="mb-7 flex animate-[fadeIn_0.6s_ease-out] flex-wrap gap-3">
          {[
            ["all", "All Tasks"],
            ["active", "In Progress"],
            ["completed", "Completed"],
          ].map(([value, label]) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 active:scale-95 ${
                filter === value
                  ? "bg-white text-[#3155C8] shadow-sm"
                  : "border border-white/30 text-white hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

       
        {error && (
          <div className="mb-5 flex items-center justify-between rounded-xl bg-white p-4 text-sm text-red-600">
            {error}

            <button
              onClick={loadTasks}
              className="font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}

       
        {loading ? (
          <div className="rounded-2xl bg-white py-16">
            <Loading label="Loading tasks..." />
          </div>
        ) : visibleTasks.length === 0 ? (
          
          <div className="animate-[fadeIn_0.4s_ease-out] rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">
              {tasks.length === 0
                ? "No tasks yet"
                : "No tasks found"}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {tasks.length === 0
                ? "Create your first task to get started."
                : "Try another filter to see your tasks."}
            </p>

            {tasks.length === 0 && (
              <Link
                to="/tasks/new"
                className="mt-6 inline-block rounded-xl bg-[#3155C8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 active:scale-95"
              >
                Create Task
              </Link>
            )}
          </div>
        ) : (
          
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleTasks.map((task, index) => (
              <Link
                to={`/tasks/${task.id}`}
                key={task.id}
                style={{ animationDelay: `${index * 70}ms` }}
                className={`group animate-[fadeIn_0.45s_ease-out_both] rounded-2xl p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] ${
                  task.completed
                    ? "bg-[#79da91] hover:bg-[#DDF4E3]"
                    : "bg-white hover:bg-blue-50"
                }`}
              >
                {/* Status and Due Date */}
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      task.completed
                        ? "bg-green-200 text-green-800"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {task.completed ? "Completed" : "In Progress"}
                  </span>

                  <span className="text-xs text-slate-500">
                    {dueLabel(task.dueDate)}
                  </span>
                </div>

                {/* Task Title */}
                <h2 className="mt-7 break-words text-2xl font-extrabold leading-8 tracking-tight text-black transition-colors duration-200 group-hover:text-[#3155C8]">
                  {task.title || "Untitled task"}
                </h2>

                {/* Task Content */}
                <p className="mt-3 line-clamp-2 min-h-10 whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
                  {task.content || "No description added."}
                </p>

                {/* View Task */}
                <div
                  className={`mt-6 flex justify-end border-t pt-4 text-sm font-bold ${
                    task.completed
                      ? "border-green-800 text-green-800"
                      : "border-slate-100 text-[#3155C8]"
                  }`}
                >
                  View Task

                  <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
