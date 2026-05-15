import Link from "next/link";

type Props = {
  number: string;
  title: string;
  description: string;
  href: string;
  locked?: boolean;
};

export default function ModuleCard({
  number,
  title,
  description,
  href,
  locked = false,
}: Props) {
  return (
    <Link
      href={locked ? "#" : href}
      className={`block border border-line bg-white p-6 group transition-colors ${
        locked ? "opacity-50 cursor-not-allowed" : "hover:border-stone"
      }`}
    >
      <p className="font-mono text-[9px] tracking-widest uppercase text-stone mb-8">
        {number}
      </p>
      <h3 className="text-xl font-light tracking-tight text-ink mb-3 group-hover:text-deep transition-colors">
        {title}
      </h3>
      <p className="text-sm font-light text-stone leading-relaxed">
        {description}
      </p>
      {locked && (
        <p className="font-mono text-[9px] tracking-wider uppercase text-stone mt-4">
          Próximamente
        </p>
      )}
    </Link>
  );
}
