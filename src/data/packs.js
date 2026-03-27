export const INDIVIDUAL_BOTTLE_PRICE = 8;

const roundPrice = (value) => Math.round(value * 100) / 100;

const basePackConfig = [
  {
    id: "fiesta",
    name: "Pack Fiesta",
    bottles: 3,
    discount: 0.1,
    desc: "Sabores mixtos",
    btnText: "Comprar pack",
    isPrimary: false
  },
  {
    id: "premium",
    name: "Pack Premium",
    bottles: 6,
    discount: 0.2,
    desc: "Sabores variados • Edición especial",
    btnText: "Comprar ahora",
    isPrimary: true
  },
  {
    id: "evento",
    name: "Pack Evento",
    bottles: 12,
    discount: 0.25,
    desc: "Ideal para fiestas grandes",
    btnText: "Comprar lote",
    isPrimary: false
  }
];

export const PACKS = basePackConfig.map((pack) => ({
  ...pack,
  price: roundPrice(pack.bottles * INDIVIDUAL_BOTTLE_PRICE * (1 - pack.discount))
}));
