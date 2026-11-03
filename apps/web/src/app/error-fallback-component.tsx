import type { FallbackProps } from 'react-error-boundary';

export function ErrorFallbackComponent({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div>
      <p>An error occurred:</p>
      <pre>{String(error)}</pre>
      <button type="button" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
}
