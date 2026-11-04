
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { deleteTask, getTask, updateTask } from "../api";

export default function TaskDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function loadTask() {
    setLoading(true);
    setError("");

    try {
      setTask(await getTask(id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTask();
  }, [id]);

  async function toggleCompleted() {
    setBusy(true);
    setError("");

    try {
      const updated = {
        title: task.title,
        content: task.content,
        dueDate: task.dueDate || null,
        completed: !task.completed,
      };

      const saved = await updateTask(id, updated);
      setTask(saved || { ...task, completed: updated.completed });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function removeTask() {
    if (!window.confirm("Delete this task permanently?")) return;

    setBusy(true);

    try {
      await deleteTask(id);
      navigate("/tasks");
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  const dueDate = task?.dueDate
    ? new Date(task.dueDate).toLocaleString()
    : "No due date";

  return (
    <div className="min-h-screen bg-[#3155C8]">
      <Navbar showBack />

      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">

        {loading ? (
          <div className="rounded-2xl bg-white py-16">
            <Loading label="Loading task..." />
          </div>
        ) : error && !task ? (
          <div className="animate-[fadeIn_0.4s_ease-out] rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-red-600">{error}</p>

            <Link
              to="/tasks"
              className="mt-5 inline-block rounded-lg bg-[#3155C8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2647AD]"
            >
              Back to Dashboard
            </Link>
          </div>
        ) : task && (
          <div className="animate-[fadeIn_0.4s_ease-out] rounded-2xl bg-white shadow-sm">

            <div className="p-6 sm:p-9">

              {/* Status and Task ID */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                    task.completed
                      ? "bg-green-50 text-green-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {task.completed ? "Completed" : "In progress"}
                </span>

                <span className="text-xs font-medium text-slate-400">
                  TASK #{task.id}
                </span>
              </div>

              {/* Task Title */}
              <h1 className="mt-6 break-words text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {task.title}
              </h1>

              <div className="my-7 border-t border-slate-100" />

              {/* Description */}
              <section>
                <p className="text-xs font-bold tracking-widest text-[#3155C8]">
                  DESCRIPTION
                </p>

                <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-slate-600">
                  {task.content || "No description added."}
                </p>
              </section>

              {/* Due Date */}
              <section className="mt-8 rounded-xl bg-blue-50/70 p-5">
                <p className="text-xs font-bold tracking-widest text-slate-500">
                  DUE DATE
                </p>

                <p className="mt-2 text-sm font-semibold text-slate-800">
                  {dueDate}
                </p>
              </section>

              {/* Error */}
              {error && (
                <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Actions */}
              <div className="mt-8 flex flex-wrap gap-3">

                <Link
                  to={`/tasks/${id}/edit`}
                  className="rounded-lg bg-[#3155C8] px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-[#2647AD] active:scale-95"
                >
                  Edit Task
                </Link>

                <button
                  onClick={toggleCompleted}
                  disabled={busy}
                  className="rounded-lg border border-blue-200 px-5 py-3 text-sm font-semibold text-[#3155C8] transition duration-200 hover:bg-blue-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {busy
                    ? "Please wait..."
                    : task.completed
                    ? "Mark In Progress"
                    : "Mark Completed"}
                </button>

                <button
                  onClick={removeTask}
                  disabled={busy}
                  className="rounded-lg border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition duration-200 hover:bg-red-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Delete Task
                </button>

              </div>

              <Link
                to="/tasks"
                className="mt-7 inline-block text-sm font-semibold text-[#3155C8] transition hover:underline"
              >
                ← Back to Dashboard
              </Link>

            </div>
          </div>
        )}

      </main>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
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
