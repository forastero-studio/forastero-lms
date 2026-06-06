export default function ContentArea({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-5 md:px-12 pt-16 md:pt-10 pb-10 max-w-3xl mx-auto">{children}</div>
  );
}
