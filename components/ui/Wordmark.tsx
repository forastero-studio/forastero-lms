export default function Wordmark({ suffix }: { suffix?: string } = {}) {
  return (
    <span
      className="font-light text-2xl text-ink"
      style={{ letterSpacing: "0.05em" }}
    >
      forastero
      {suffix && <span className="text-stone">{suffix}</span>}
    </span>
  );
}
