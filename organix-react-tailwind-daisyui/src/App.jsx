import { Navigate, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import DashboardPage from "./pages/DashboardPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import EditTaskPage from "./pages/EditTaskPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/tasks" element={<DashboardPage />} />
      <Route path="/tasks/new" element={<CreateTaskPage />} />
      <Route path="/tasks/:id" element={<TaskDetailsPage />} />
      <Route path="/tasks/:id/edit" element={<EditTaskPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
