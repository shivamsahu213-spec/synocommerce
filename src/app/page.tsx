export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-16">
      <section className="space-y-6">
        <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          SynoCommerce Foundation
        </span>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Enterprise ecommerce architecture, ready for scale.
          </h1>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
            This workspace intentionally initializes platform architecture, shared systems, theme contracts,
            module boundaries, and developer standards before any storefront functionality is built.
          </p>
        </div>
      </section>
    </main>
  );
}
