export function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="container-page section-space">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        {subtitle ? <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">{subtitle}</p> : null}
      </div>
      <div className="mt-6 sm:mt-8">{children}</div>
    </section>
  );
}
