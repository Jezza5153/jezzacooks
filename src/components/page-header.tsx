type PageHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export default function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <section className={`py-16 md:py-24 text-center bg-card ${className}`}>
      <div className="container mx-auto px-4">
        <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
