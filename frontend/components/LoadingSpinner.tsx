/**
 * LoadingSpinner.jsx
 * ─────────────────────────────────────────────────────────────
 * A reusable loading indicator.
 * Props:
 *   - size: "sm" | "md" | "lg" (default: "md")
 *   - message: optional text to show below the spinner
 * ─────────────────────────────────────────────────────────────
 */

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

export default function LoadingSpinner({ size = "md", message }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-white/20 border-t-white`}
      />
      {message && (
        <p className="animate-pulse text-sm text-white/70">{message}</p>
      )}
    </div>
  );
}
