import Link from "next/link";

type ButtonProps = {
  variant?: "primary" | "outline";
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function Button({
  variant = "outline",
  href,
  children,
  className = "",
  onClick,
}: ButtonProps) {
  const base =
    "inline-block border px-5 py-3 text-sm font-light tracking-wide transition-colors";
  const variants = {
    primary: "bg-ink text-white border-ink hover:bg-deep hover:border-deep",
    outline: "bg-transparent text-ink border-ink hover:border-rust hover:text-rust",
  };
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
