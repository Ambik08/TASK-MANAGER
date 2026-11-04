import { useState } from "react";

function toDateInput(value) {
  if (!value) return "";
  return String(value).slice(0, 16);
}

export default function TaskForm({ initialTask, onSubmit, saving, error, submitLabel }) {
  const [form, setForm] = useState({
    title: initialTask?.title || "",
    content: initialTask?.content || "",
    dueDate: toDateInput(initialTask?.dueDate),
    completed: Boolean(initialTask?.completed)
  });

  function update(event) {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function submit(event) {
    event.preventDefault();
    onSubmit({
      title: form.title.trim(),
      content: form.content.trim(),
      dueDate: form.dueDate || null,
      completed: form.completed
    });
  }

  return (
    <form onSubmit={submit} className="card border border-base-200 bg-white shadow-sm">
      <div className="card-body gap-5 p-5 sm:p-7">
        <label className="form-control w-full gap-2">
          <span className="label-text font-semibold text-slate-700">Task title <span className="text-error">*</span></span>
          <input
            className="input input-bordered w-full focus:border-blue-500"
            name="title"
            value={form.title}
            onChange={update}
            placeholder="What do you need to do?"
            maxLength={120}
            required
          />
        </label>

        <label className="form-control w-full gap-2">
          <span className="label-text font-semibold text-slate-700">Description</span>
          <textarea
            className="textarea textarea-bordered min-h-28 w-full focus:border-blue-500"
            name="content"
            value={form.content}
            onChange={update}
            placeholder="Add some details (optional)"
          />
        </label>

        <label className="form-control w-full gap-2">
          <span className="label-text font-semibold text-slate-700">Due date</span>
          <input
            className="input input-bordered w-full focus:border-blue-500"
            type="datetime-local"
            name="dueDate"
            value={form.dueDate}
            onChange={update}
          />
        </label>

        {initialTask && (
          <label className="label cursor-pointer justify-start gap-3">
            <input
              type="checkbox"
              className="checkbox checkbox-primary checkbox-sm"
              name="completed"
              checked={form.completed}
              onChange={update}
            />
            <span className="label-text text-slate-700">Mark as completed</span>
          </label>
        )}

        {error && <div role="alert" className="alert alert-error py-3 text-sm">{error}</div>}

        <div className="mt-1 flex flex-wrap gap-3">
          <button className="btn btn-primary min-w-32" disabled={saving}>
            {saving ? <span className="loading loading-spinner loading-xs" /> : submitLabel}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => window.history.back()}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
