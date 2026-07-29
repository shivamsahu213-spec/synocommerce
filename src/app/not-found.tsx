export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="max-w-lg space-y-4 text-center">
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="text-sm text-muted-foreground">
          This route does not exist or has not been configured for the current brand and theme.
        </p>
      </div>
    </div>
  );
}
