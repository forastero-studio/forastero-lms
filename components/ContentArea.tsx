export default function ContentArea({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-12 py-10 max-w-3xl mx-auto">{children}</div>
  );
}
