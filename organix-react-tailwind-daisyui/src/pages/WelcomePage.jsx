
import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#3155C8] text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 sm:px-14">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          Organix.
        </Link>

        <Link
          to="/tasks"
          className="text-sm font-medium text-white/90 transition hover:text-white"
        >
          Dashboard →
        </Link>
      </nav>

      {/* Main content */}
      <main className="flex flex-1 items-center justify-center px-6 text-center">

        <div className="animate-[fadeIn_0.8s_ease-out]">

          <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-7xl">
            List all your tasks.
            <br />
            Get things done.
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base leading-8 text-blue-100">
            A simple place to organise your daily tasks
            and keep track of what needs to be done.
          </p>

          <Link
            to="/tasks"
            className="mt-9 inline-flex items-center gap-3 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-[#3155C8] transition duration-200 hover:-translate-y-1 hover:bg-blue-50 active:scale-95"
          >
            Get Started <span>→</span>
          </Link>

        </div>

      </main>

      {/* Footer */}
      <footer className="px-8 py-6 text-center text-xs text-blue-100/80">
        © {new Date().getFullYear()} Organix
      </footer>

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
