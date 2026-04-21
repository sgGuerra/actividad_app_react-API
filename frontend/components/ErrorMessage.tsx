/**
 * ErrorMessage.jsx
 * ─────────────────────────────────────────────────────────────
 * Displays an error message in a styled red box.
 * Props:
 *   - message: the error text to display
 *   - onRetry: optional function to call when "Try Again" is clicked
 * ─────────────────────────────────────────────────────────────
 */

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/[0.04] p-16">
      <span className="flex-shrink-0 text-white">!</span>
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-xs text-white/70 underline transition-colors hover:text-white"
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
}
