export default function Loading({ label = "Loading..." }) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center gap-3 text-sm text-slate-500">
      <span className="loading loading-spinner loading-md text-primary" />
      {label}
    </div>
  );
}
