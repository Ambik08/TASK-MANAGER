const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers
      }
    });
  } catch {
    throw new Error(`Cannot connect to ${API_BASE}. Make sure Spring Boot is running.`);
  }

  const text = await response.text();
  let data = null;
  if (text) {
    try { data = JSON.parse(text); }
    catch { data = text; }
  }

  if (!response.ok) {
    const message = typeof data === "string" ? data : data?.message;
    throw new Error(message || `Request failed (${response.status})`);
  }
  return data;
}

export const getTasks = () => request("/tasks");
export const getTask = (id) => request(`/tasks/${id}`);
export const createTask = (task) => request("/tasks", {
  method: "POST",
  body: JSON.stringify(task)
});
export const updateTask = (id, task) => request(`/tasks/${id}`, {
  method: "PUT",
  body: JSON.stringify(task)
});
export const deleteTask = (id) => request(`/tasks/${id}`, { method: "DELETE" });
