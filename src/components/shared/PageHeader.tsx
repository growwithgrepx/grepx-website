type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8 text-center md:text-left">
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto md:mx-0">
          {description}
        </p>
      )}
    </div>
  );
}
