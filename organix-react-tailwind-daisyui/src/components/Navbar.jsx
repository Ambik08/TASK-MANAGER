import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ showBack = false }) {
  const navigate = useNavigate();

  return (
    <header className="navbar min-h-16 border-b border-base-200 bg-[#3155C8] sm:px-10">
      <div className="flex-1">
        {showBack ? (
          <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm gap-2  text-white">
            <span aria-hidden="true">←</span> Back
          </button>
        ) : (
          <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight  text-white">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600 text-sm  text-white">O</span>
            Organix<span className="text-white-500">.</span>
          </Link>
        )}
      </div>
      <div className="flex-none items-center gap-3 ">
        <span className="hidden text-xs font-medium tracking-wide text-slate-400 sm:inline">YOUR PERSONAL TASK SPACE</span>
        <Link to="/tasks" className="btn btn-ghost btn-sm text-white">Tasks</Link>
      </div>
    </header>
  );
}
