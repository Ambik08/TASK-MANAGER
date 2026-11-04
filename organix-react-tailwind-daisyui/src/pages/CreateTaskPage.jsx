
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import { createTask } from "../api";

export default function CreateTaskPage() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(task) {
    setSaving(true);
    setError("");

    try {
      await createTask(task);
      navigate("/tasks");
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

        {/* Page Heading */}
        <div className="mb-8 animate-[fadeIn_0.4s_ease-out]">
          <p className="text-xs font-bold tracking-[0.18em] text-blue-200">
            ADD SOMETHING NEW
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Create a task
          </h1>

          <p className="mt-2 text-sm text-blue-100">
            Write down what you want to get done.
          </p>
        </div>

        
        <div className="animate-[fadeIn_0.5s_ease-out] [&_.card]:rounded-2xl [&_.card]:shadow-sm">
          <TaskForm
            onSubmit={handleSubmit}
            saving={saving}
            error={error}
            submitLabel="Create Task"
          />
        </div>

      </main>

      
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
