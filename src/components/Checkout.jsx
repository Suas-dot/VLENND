import { useMemo, useState } from 'react';
import { FLAVORS } from '../data/flavors';
import { INDIVIDUAL_BOTTLE_PRICE } from '../data/packs';

const deliveryFee = 0;
const flavorOptions = FLAVORS.map((flavor) => flavor.label);

const initialFormState = {
  fullName: '',
  phone: '',
  province: '',
  city: '',
  address: ''
};

const distributeFlavors = (totalBottles, selectedFlavors) => {
  if (selectedFlavors.length === 0) {
    return [];
  }

  const base = Math.floor(totalBottles / selectedFlavors.length);
  const remainder = totalBottles % selectedFlavors.length;

  return selectedFlavors.map((flavor, index) => ({
    flavor,
    bottles: base + (index < remainder ? 1 : 0)
  }));
};

const formatCartItemForMessage = (item) => {
  if (item.type === 'pack') {
    const flavorBreakdown = distributeFlavors(item.packSize, item.selectedFlavors)
      .map((entry) => `${entry.flavor} (${entry.bottles})`)
      .join(', ');
    return `- ${item.packName} x${item.quantity} | ${item.packSize} botellas por pack | Sabores: ${flavorBreakdown} | $${(item.unitPrice * item.quantity).toFixed(2)}`;
  }

  return `- ${item.packName} x${item.quantity} | Sabor: ${item.flavor} | $${(item.unitPrice * item.quantity).toFixed(2)}`;
};

export default function Checkout({ selectedPack, availablePacks = [], onSelectPack }) {
  const [form, setForm] = useState(initialFormState);
  const [orderSent, setOrderSent] = useState(false);
  const [purchaseType, setPurchaseType] = useState('pack');
  const [selectedFlavor, setSelectedFlavor] = useState(flavorOptions[0] ?? '');
  const [selectedPackFlavors, setSelectedPackFlavors] = useState([flavorOptions[0] ?? '']);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [checkoutError, setCheckoutError] = useState('');
  const singleBottlePrice = INDIVIDUAL_BOTTLE_PRICE;

  const cartSubtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0),
    [cartItems]
  );
  const total = useMemo(
    () => (cartItems.length > 0 ? cartSubtotal + deliveryFee : 0),
    [cartItems.length, cartSubtotal]
  );
  const cartBottleCount = useMemo(
    () =>
      cartItems.reduce((acc, item) => {
        if (item.type === 'pack') {
          return acc + (item.packSize * item.quantity);
        }
        return acc + item.quantity;
      }, 0),
    [cartItems]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePackSelection = (event) => {
    const packId = event.target.value;
    const nextPack = availablePacks.find((pack) => pack.id === packId);
    if (!nextPack) {
      return;
    }

    onSelectPack?.(nextPack);
    setOrderSent(false);
    setCheckoutError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cartItems.length === 0) {
      setCheckoutError('Agrega al menos un producto al carrito antes de confirmar.');
      return;
    }

    const orderLines = cartItems.map((item) => formatCartItemForMessage(item)).join('\n');
    const message = [
      'Hola VLENND, quiero confirmar este pedido:',
      '',
      '*Productos*',
      orderLines,
      '',
      '*Resumen*',
      `- Subtotal: $${cartSubtotal.toFixed(2)}`,
      `- Envio: GRATIS`,
      `- Total: $${total.toFixed(2)}`,
      '',
      '*Datos de envio*',
      `- Nombre: ${form.fullName}`,
      `- Celular: ${form.phone}`,
      `- Provincia: ${form.province}`,
      `- Ciudad: ${form.city}`,
      `- Direccion: ${form.address}`,
      '',
      'Quedo atento para finalizar el pago.'
    ].join('\n');

    const whatsappUrl = `https://wa.me/593990413435?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setCheckoutError('');
    setOrderSent(true);
    setForm(initialFormState);
    setCartItems([]);
    setQuantity(1);
    setSelectedPackFlavors([flavorOptions[0] ?? '']);
    setSelectedFlavor(flavorOptions[0] ?? '');
  };

  const togglePackFlavor = (flavor) => {
    setSelectedPackFlavors((prev) => {
      if (prev.includes(flavor)) {
        if (prev.length === 1) {
          return prev;
        }
        return prev.filter((item) => item !== flavor);
      }

      return [...prev, flavor];
    });
  };

  const handleAddPackToCart = (normalizedQty) => {
    if (selectedPackFlavors.length === 0) {
      setCheckoutError('Selecciona al menos un sabor para armar el pack.');
      return;
    }

    const flavorKey = selectedPackFlavors.join('-');
    const itemId = `${selectedPack.id ?? selectedPack.name}-pack-${flavorKey}`;

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === itemId);
      if (existingItem) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + normalizedQty }
            : item
        );
      }

      return [
        ...prev,
        {
          id: itemId,
          type: 'pack',
          packId: selectedPack.id ?? selectedPack.name,
          packName: selectedPack.name,
          packSize: selectedPack.bottles,
          selectedFlavors: [...selectedPackFlavors],
          unitPrice: selectedPack.price,
          quantity: normalizedQty
        }
      ];
    });
  };

  const handleAddSingleToCart = (normalizedQty) => {
    const itemId = `${selectedPack.id ?? selectedPack.name}-single-${selectedFlavor}`;

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === itemId);
      if (existingItem) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + normalizedQty }
            : item
        );
      }

      return [
        ...prev,
        {
          id: itemId,
          type: 'individual',
          packId: selectedPack.id ?? selectedPack.name,
          packName: `${selectedPack.name} (Individual)`,
          flavor: selectedFlavor,
          unitPrice: singleBottlePrice,
          quantity: normalizedQty
        }
      ];
    });
  };

  const handleAddToCart = () => {
    if (!selectedPack?.name) {
      return;
    }

    const normalizedQty = Number.isFinite(quantity) ? Math.max(1, quantity) : 1;
    setCheckoutError('');

    if (purchaseType === 'pack') {
      handleAddPackToCart(normalizedQty);
    } else {
      handleAddSingleToCart(normalizedQty);
    }

    setOrderSent(false);
    setQuantity(1);
  };

  const updateItemQuantity = (itemId, nextQty) => {
    if (nextQty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: nextQty } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  return (
    <section id="checkout" className="theme-section-surface-main py-24 bg-[#0f081a]/80 border-y border-vlennd-silver/10">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-8">
        <div className="theme-checkout-panel rounded-3xl border border-white/10 bg-vlennd-carbon/70 p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-vlennd-silver/80 mb-3">
            Checkout rapido
          </p>
          <h2 className="font-heading text-4xl text-vlennd-ivory mb-4">
            Finaliza tu compra
          </h2>
          <p className="font-sans text-vlennd-smoke mb-8">
            Completa tus datos para reservar tu pedido en menos de 1 minuto.
          </p>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 mb-6">
            <p className="font-mono text-xs uppercase tracking-widest text-vlennd-silver/80 mb-3">
              Personaliza tu pedido
            </p>
            <p className="font-sans text-sm text-vlennd-ivory mb-3">
              {selectedPack?.name ?? 'Pack seleccionado'} • {selectedPack?.bottles ?? 0} botellas
            </p>
            <select
              value={selectedPack?.id ?? ''}
              onChange={handlePackSelection}
              className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-vlennd-ivory outline-none focus:border-vlennd-silver mb-3"
            >
              {availablePacks.map((pack) => (
                <option key={pack.id} value={pack.id} className="text-black">
                  {pack.name} • {pack.bottles} botellas • ${pack.price.toFixed(2)}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                type="button"
                onClick={() => setPurchaseType('pack')}
                className={`rounded-xl border px-3 py-2 font-sans text-sm transition-colors ${
                  purchaseType === 'pack'
                    ? 'border-vlennd-silver bg-vlennd-silver/15 text-vlennd-ivory'
                    : 'border-white/15 text-vlennd-smoke hover:text-vlennd-ivory'
                }`}
              >
                Pack mixto
              </button>
              <button
                type="button"
                onClick={() => setPurchaseType('individual')}
                className={`rounded-xl border px-3 py-2 font-sans text-sm transition-colors ${
                  purchaseType === 'individual'
                    ? 'border-vlennd-silver bg-vlennd-silver/15 text-vlennd-ivory'
                    : 'border-white/15 text-vlennd-smoke hover:text-vlennd-ivory'
                }`}
              >
                Botellas individuales
              </button>
            </div>

            {purchaseType === 'pack' ? (
              <div className="space-y-2">
                <p className="font-sans text-xs text-vlennd-smoke">Sabores dentro del pack</p>
                <div className="flex flex-wrap gap-2">
                  {flavorOptions.map((flavor) => {
                    const active = selectedPackFlavors.includes(flavor);
                    return (
                      <button
                        key={flavor}
                        type="button"
                        onClick={() => togglePackFlavor(flavor)}
                        className={`rounded-full border px-3 py-1.5 font-sans text-xs transition-colors ${
                          active
                            ? 'border-vlennd-silver bg-vlennd-silver/15 text-vlennd-ivory'
                            : 'border-white/15 text-vlennd-smoke hover:text-vlennd-ivory'
                        }`}
                      >
                        {flavor}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <select
                value={selectedFlavor}
                onChange={(event) => setSelectedFlavor(event.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-vlennd-ivory outline-none focus:border-vlennd-silver"
              >
                {flavorOptions.map((flavor) => (
                  <option key={flavor} value={flavor} className="text-black">
                    {flavor}
                  </option>
                ))}
              </select>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
                className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-vlennd-ivory outline-none focus:border-vlennd-silver"
              />
              <div className="rounded-xl border border-white/15 bg-black/20 px-4 py-3 font-mono text-sm text-vlennd-silver flex items-center">
                {purchaseType === 'pack'
                  ? `${quantity > 1 ? `${quantity} packs` : '1 pack'} • $${(selectedPack?.price * Math.max(1, quantity || 1)).toFixed(2)}`
                  : `${quantity > 1 ? `${quantity} botellas` : '1 botella'} • $${(singleBottlePrice * Math.max(1, quantity || 1)).toFixed(2)}`}
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-3 w-full py-3 rounded-full font-sans font-semibold text-sm text-vlennd-ivory border border-vlennd-silver/40 hover:bg-vlennd-silver/10 transition-colors"
            >
              Agregar al carrito
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              required
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Nombre completo"
              className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-vlennd-ivory placeholder:text-vlennd-smoke/60 outline-none focus:border-vlennd-silver"
            />
            <input
              required
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Numero de celular"
              className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-vlennd-ivory placeholder:text-vlennd-smoke/60 outline-none focus:border-vlennd-silver"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                required
                name="province"
                value={form.province}
                onChange={handleChange}
                placeholder="Provincia"
                className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-vlennd-ivory placeholder:text-vlennd-smoke/60 outline-none focus:border-vlennd-silver"
              />
              <input
                required
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Ciudad"
                className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-vlennd-ivory placeholder:text-vlennd-smoke/60 outline-none focus:border-vlennd-silver"
              />
            </div>
            <input
              required
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Calles / Direccion de envio"
                className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-vlennd-ivory placeholder:text-vlennd-smoke/60 outline-none focus:border-vlennd-silver"
            />
            <button
              type="submit"
              className="w-full py-4 rounded-full font-sans font-bold text-vlennd-deep bg-silver-gradient hover:scale-[1.01] transition-transform"
            >
              Confirmar pedido
            </button>
          </form>

          {orderSent && (
            <p className="mt-5 rounded-xl border border-emerald-300/30 bg-emerald-500/10 px-4 py-3 font-sans text-sm text-emerald-200">
              Te abrimos WhatsApp con la plantilla lista para terminar tu pedido.
            </p>
          )}
          {checkoutError && (
            <p className="mt-5 rounded-xl border border-rose-300/30 bg-rose-500/10 px-4 py-3 font-sans text-sm text-rose-200">
              {checkoutError}
            </p>
          )}
        </div>

        <aside className="theme-checkout-panel-alt rounded-3xl border border-white/10 bg-[#130a22]/70 p-8 h-fit">
          <p className="font-mono text-xs uppercase tracking-widest text-vlennd-silver/80 mb-3">
            Carrito ({cartBottleCount} botellas)
          </p>
          <h3 className="font-heading text-2xl text-vlennd-ivory mb-6">
            Resumen del pedido
          </h3>
          <div className="space-y-3">
            {cartItems.length === 0 && (
              <p className="font-sans text-sm text-vlennd-smoke">
                Tu carrito esta vacio. Puedes agregar packs mixtos o botellas individuales.
              </p>
            )}

            {cartItems.map((item) => (
              <div key={item.id} className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="font-sans text-sm text-vlennd-ivory">{item.packName}</p>
                {item.type === 'pack' ? (
                  <p className="font-mono text-xs text-vlennd-smoke mt-1">
                    {distributeFlavors(item.packSize * item.quantity, item.selectedFlavors)
                      .map((entry) => `${entry.flavor} (${entry.bottles})`)
                      .join(' • ')}
                  </p>
                ) : (
                  <p className="font-mono text-xs text-vlennd-smoke mt-1">
                    Sabor: {item.flavor} • Botella individual
                  </p>
                )}
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border border-white/20 text-vlennd-ivory"
                    >
                      -
                    </button>
                    <span className="font-mono text-sm text-vlennd-ivory min-w-6 text-center">
                      {item.quantity} {item.type === 'pack' ? 'pack' : 'u'}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border border-white/20 text-vlennd-ivory"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm text-vlennd-silver">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="font-sans text-xs text-rose-200 hover:text-rose-100"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="border-t border-white/10 pt-3 space-y-2 font-sans text-vlennd-smoke">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Envio</span>
                <span>{cartItems.length > 0 ? 'Gratis' : '$0.00'}</span>
              </div>
              <div className="pt-1 flex items-center justify-between text-vlennd-ivory font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
