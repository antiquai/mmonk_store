"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

// --- Типы данных ---
type Product = {
  id: string;
  name: string;
  fit: string ;
  price: number;
  image: string;
  tag?: string;
  colors?: string[]; // hex цвета или tailwind классы
  sizes?: ("XS"|"S"|"M"|"L"|"XL"|"XXL")[];
};

// --- Черновые данные (замени на реальные) ---
export const PRODUCTS: Product[] = [
  {
    id: "mm-tee-lotus",
    name: "Monkey Tee",
    fit: "Loose",
    price: 29,
    image: '/design/des_1.png',
    tag: "New",
    colors: ["#0a0a0a"],
    sizes: ["S","M","L", "XL"],
  },
  {
    id: "ape bath",
    name: "Ape Bath Tee",
    fit: "Loose",
    price: 29,
    image: '/design/des_6.png',
    tag: "New",
    colors: ["#f5f5f4"],
    sizes: ["M","L", "XL"],
  },
    {
    id: "mm-crew-kōan",
    name: "Heart Monkey",
    fit: "Loose",
    price: 29,
    image: '/design/des_5.png',
    colors: ["#744d4d"],
    sizes: ["S","M","L", "XL"],
  },
  {
    id: "mm-hood-enso",
    name: "On the Tit",
    fit: "Loose",
    price: 29,
    image: '/design/des_2.png',
    tag: "Drop",
    colors: ["#0a0a0a"],
    sizes: ["S","M","L", "XL"],
  },
  {
    id: "mm-cap-monkseal",
    name: "Clearness of Mind",
    fit: "Loose",
    price: 29,
    image: '/design/des_4.png',
    tag: "Restock",
    colors: ["#f5f5f4"],
    sizes: ["S","M","L", "XL"],
  },
  {
    id: "mm-tee-dharma",
    name: "Dharma Tee",
    fit: "Loose",
    price: 22,
    image: '/design/des_3.png',
    colors: [ "#0a0a0a"],
    sizes: ["S","M","L", "XL"],
  },
];

// --- Вспомогательные компоненты ---
function Price({ value }: { value: number }) {
  return (
    <span className="font-semibold tracking-tight">€ {value}</span>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute left-3 top-3 z-20 rounded-full bg-black/80 px-3 py-1 text-xs font-medium text-white shadow-lg backdrop-blur">
      {children}
    </span>
  );
}

function ZenWatermark() {
  return (
    <svg
      className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 opacity-15 mix-blend-overlay"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 10c22.091 0 40 17.909 40 40 0 13.255-10.745 24-24 24"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
}

// --- Карточка товара (с Tilt эффектом) ---
function ProductCard({ p, mousePosition }: { p: Product, mousePosition: {x:number,y:number} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl bg-zinc-950 text-zinc-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
      style={{
        transform: `rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.2s ease-out",
      }}
    >
      {p.tag && <Badge>{p.tag}</Badge>}
      <ZenWatermark />
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={p.image}
          alt={p.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-3 bottom-3 flex translate-y-4 items-center justify-between gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button className="w-full rounded-xl bg-white/95 px-4 py-2 text-sm font-semibold text-zinc-900 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/50">
            To corb
          </button>
          <button className="rounded-xl bg-zinc-900/80 px-3 py-2 text-xs text-white ring-1 ring-white/15 hover:bg-zinc-800">
            More
          </button>
        </div>
      </div>
      <div className="flex items-start justify-between p-4">
        <div className="min-w-0">
          <h3 className="truncate text-base font-medium tracking-tight">{p.name}</h3>
          <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400">
            {p.colors && p.colors.length > 0 && (
              <div className="flex items-center gap-1">
                {p.colors.slice(0,4).map((c, i) => (
                  <span
                    key={i}
                    className="inline-block h-3 w-3 rounded-full ring-1 ring-white/30"
                    style={{ background: c }}
                  />
                ))}
              </div>
            )}
            {p.sizes && p.sizes.length > 0 && (
              <span className="truncate">Sizes : {p.sizes.join(" ")}</span>
            )}
          </div>
        </div>
        <Price value={p.price} />
      </div>
    </motion.div>
  );
}

// --- Секция каталога (с параллаксом) ---
export function CatalogSection({
  title = "Cataloge",
  products = PRODUCTS,
  highlight = "Streetwear with purity of mischievous mind",
}: {
  title?: string;
  products?: Product[];
  highlight?: string;
}) {
  const total = products?.length ?? 0;
  const subtitle = useMemo(
    () => `${highlight} • ${total} items`,
    [highlight, total]
  );

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = (e.clientY - top - height / 2) / 20;
    setMousePosition({ x, y });
  };

  return (
    <section
      className="relative mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-8 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Фоновый слой (параллакс) */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.05), transparent 60%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.05), transparent 60%)",
          backgroundSize: "200% 200%",
        }}
      />

      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
          <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-xl border border-white/15 bg-zinc-900 px-4 py-2 text-xs text-white hover:bg-zinc-800">
            New
          </button>
          <button className="rounded-xl border border-white/15 bg-zinc-900 px-4 py-2 text-xs text-white hover:bg-zinc-800">
            Cost ↑↓
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} mousePosition={mousePosition} />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-2">
        <button className="rounded-xl border border-white/15 bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800">
          ← Previouse
        </button>
        <span className="px-3 text-sm text-zinc-400">pg. 1 of 5</span>
        <button className="rounded-xl border border-white/15 bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800">
          Next →
        </button>
      </div>
    </section>
  );
}