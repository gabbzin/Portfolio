export default function Footer() {
  return (
    <footer className="border-t bg-background py-8">
      <p className="container text-center text-sm text-subtle">
        © {new Date().getFullYear()} Gabriel Pimentel
      </p>
    </footer>
  );
}
