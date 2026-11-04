
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import TaskForm from "../components/TaskForm";
import { getTask, updateTask } from "../api";

export default function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getTask(id)
      .then(setTask)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(updatedTask) {
    setSaving(true);
    setError("");

    try {
      await updateTask(id, updatedTask);
      navigate(`/tasks/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#3155C8]">
      <Navbar showBack />

      <main className="mx-auto max-w-2xl px-5 py-12 sm:px-8">

        <div className="mb-8 animate-[fadeIn_0.4s_ease-out]">
          <p className="text-xs font-semibold tracking-widest text-blue-200">
            UPDATE YOUR TASK
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Edit Task
          </h1>

          <p className="mt-2 text-sm text-blue-100">
            Make changes and save your task.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white py-16">
            <Loading label="Loading task..." />
          </div>
        ) : task ? (
          <div className="animate-[fadeIn_0.4s_ease-out] [&_.card]:rounded-2xl [&_.card]:shadow-sm">
            <TaskForm
              initialTask={task}
              onSubmit={handleSubmit}
              saving={saving}
              error={error}
              submitLabel="Save Changes"
            />
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-red-600">
              {error || "Task not found."}
            </p>

            <button
              onClick={() => navigate("/tasks")}
              className="mt-5 rounded-xl bg-[#3155C8] px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-[#2647AD] active:scale-95"
            >
              Back to Tasks
            </button>
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
