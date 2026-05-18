import BuyButton from "@/components/ui/BuyButton";

export default function CadManagementProductPage() {
  return (
    <main className="min-h-screen bg-paper">
      <div className="px-14 py-20 max-w-5xl mx-auto">
        <p className="eyebrow mb-6">Taller</p>
        <h1 className="text-5xl font-light tracking-tight leading-tight mb-6 text-ink">
          CAD Management
        </h1>
        <p className="text-xl font-light text-deep leading-relaxed max-w-2xl mb-10">
          Ordená tu producción en CAD. Documentación de obras y cotizaciones con
          un sistema claro y repetible.
        </p>
        <BuyButton
          checkoutUrl={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_CAD_MANAGEMENT!}
          className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light hover:border-rust hover:text-rust transition-colors"
        >
          Comprar taller · USD 99
        </BuyButton>
      </div>
    </main>
  );
}
