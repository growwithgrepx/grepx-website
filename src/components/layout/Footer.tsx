export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card border-t border-border py-8 text-center text-sm text-muted-foreground">
      <div className="container mx-auto px-4">
        <p>&copy; {currentYear} GrepX. All rights reserved.</p>
        <p className="mt-2">Pioneering the Future of AI.</p>
      </div>
    </footer>
  );
}
