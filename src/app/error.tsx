'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    console.error('Unhandled route error', {
      digest: error.digest,
      message: error.message
    });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="max-w-lg space-y-4 text-center">
        <h1 className="text-3xl font-semibold">Something went wrong</h1>
        <p className="text-sm text-muted-foreground">
          The failure has been isolated at the route level. Observability adapters can hook into this
          boundary later without changing feature code.
        </p>
        <button
          className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground"
          onClick={reset}
          type="button"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
