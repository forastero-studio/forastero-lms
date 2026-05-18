import BuyButton from "@/components/ui/BuyButton";

export default function BootcampProductPage() {
  return (
    <main className="min-h-screen bg-paper">
      <div className="px-14 py-20 max-w-5xl mx-auto">
        <p className="eyebrow mb-6">Bootcamp · 8 semanas</p>
        <h1 className="text-5xl font-light tracking-tight leading-tight mb-6 text-ink">
          Bootcamp CAD→BIM
        </h1>
        <p className="text-xl font-light text-deep leading-relaxed max-w-2xl mb-10">
          La transición completa a BIM. Con agente Forastero integrado que
          acompaña cada semana del proceso.
        </p>
        <BuyButton
          checkoutUrl={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_BOOTCAMP!}
          className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light hover:border-rust hover:text-rust transition-colors"
        >
          Comprar bootcamp · USD 297
        </BuyButton>
      </div>
    </main>
  );
}
