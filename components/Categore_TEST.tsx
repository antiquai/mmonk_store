// components/Catalog.tsx
'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

// --- Типы данных ---
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  // optional hover/alternate images array or single hoverImage for convenience
  images?: string[];
  hoverImage?: string;
  tag?: string;
  colors?: string[]; // hex цвета или tailwind классы
  sizes?: ("XS"|"S"|"M"|"L"|"XL"|"XXL")[];
};

// --- Черновые данные (замени на реальные) ---
export const PRODUCTS: Product[] = [
  {
    id: "mm-tee-lotus",
    name: "Lotus Tee",
    price: 49,
    image: '/design/des_1.png',
    hoverImage: '/design/des_1_looped.png',
    tag: "New",
    colors: ["#0a0a0a"],
    sizes: ["M","L","XL"],
  },
  {
    id: "mm-hood-enso",
    name: "Red Lily Tee",
    price: 89,
    image: '/design/des_5.png',
    hoverImage: '/design/des_5_looped.png',
    tag: "Drop",
    colors: ["#744d4d"],
    sizes: ["M","L","XL"],
  },
  {
    id: "mm-tee-dharma",
    name: "Dharma Tee",
    price: 52,
    image: '/design/des_3.png',
    hoverImage: '/design/des_3_looped.png',
    colors: ["#0a0a0a"],
    sizes: ["M","L","XL"],
  },
  {
    id: "mm-cap-monkseal",
    name: "Monk Seal Cap",
    price: 39,
    image: '/design/des_4.png',
    hoverImage: '/design/des_4_looped.png',
    tag: "Restock",
    colors: ["#d6d3d1"],
    sizes: ["M","L","XL"],
  },
  {
    id: "mm-crew-kōan",
    name: "MMonk Crewneck",
    price: 79,
    image: '/design/des_2.png',
    hoverImage: '/design/des_2_looped.png',
    colors: ["#0a0a0a"],
    sizes: ["M","L","XL"],
  },
];

// --- Вспомогательные компоненты ---
function Price({ value }: { value: number }) {
  return <span className="font-semibold tracking-tight">€{value}</span>;
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

/* ------------------------------
   Helper: safe hex -> rgba converter
   accepts "#RRGGBB" or "#RGB" and returns `rgba(r,g,b,a)`
   ------------------------------ */
function hexToRgba(hex: string, alpha = 0.12) {
  if (!hex || typeof hex !== "string") return `rgba(255,255,255,${alpha})`;
  const h = hex.replace("#", "").trim();
  if (h.length === 3) {
    const r = parseInt(h[0] + h[0], 16);
    const g = parseInt(h[1] + h[1], 16);
    const b = parseInt(h[2] + h[2], 16);
    return `rgba(${r},${g},${b},${alpha})`;
  } else if (h.length === 6) {
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  // fallback to transparent black-ish
  return `rgba(0,0,0,${alpha})`;
}

/* ------------------------------
   ProductCard
   - Crossfade between primary and hover image
   - Preload hover image when element enters viewport
   - Desktop hover, keyboard focus, small-screen toggle button
   - Reports color to optional onHoverColor prop (keeps earlier behavior)
   ------------------------------ */
function ProductCard({
  p,
  onHoverColor,
}: {
  p: Product;
  onHoverColor?: (c?: string) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const hoverTimerRef = useRef<number | null>(null);

  // derive hover image from either images[1] or hoverImage
  const hoverSrc = p.images && p.images.length > 1 ? p.images[1] : p.hoverImage;

  // preload hover image when card enters viewport
  useEffect(() => {
    if (!hoverSrc || !isInView) return;
    const img = new Image();
    img.src = hoverSrc;
    // no cleanup needed; browser caches
  }, [hoverSrc, isInView]);

  // intersection observer to set isInView
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setIsInView(true);
        });
      },
      { root: null, threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // small debounce for hover to avoid flicker
  const handleMouseEnter = useCallback(() => {
    // report color as before
    const c = p.colors && p.colors.length > 0 ? p.colors[0] : undefined;
    if (c) onHoverColor?.(c);
    else if (p.tag === "Drop") onHoverColor?.("#b45309");
    else if (p.name.toLowerCase().includes("lotus") || p.name.toLowerCase().includes("dharma"))
      onHoverColor?.("#06b6d4");
    else onHoverColor?.(undefined);

    if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
    // slight delay to avoid flashing while moving pointer quickly
    hoverTimerRef.current = window.setTimeout(() => {
      if (hoverSrc) setIsPreview(true);
      else {
        // if no hover image, perform a soft simulated preview (zoomed primary) by still toggling preview
        setIsPreview(true);
      }
      hoverTimerRef.current = null;
    }, 70);
  }, [p, hoverSrc, onHoverColor]);

  const handleMouseLeave = useCallback(() => {
    onHoverColor?.(undefined);
    if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = window.setTimeout(() => {
      setIsPreview(false);
      hoverTimerRef.current = null;
    }, 80);
  }, [onHoverColor]);

  // keyboard focus handlers (accessibility)
  const handleFocus = useCallback(() => {
    if (hoverSrc) setIsPreview(true);
    onHoverColor?.(p.colors && p.colors.length > 0 ? p.colors[0] : undefined);
  }, [hoverSrc, onHoverColor, p]);

  const handleBlur = useCallback(() => {
    setIsPreview(false);
    onHoverColor?.(undefined);
  }, [onHoverColor]);

  // mobile toggle button handler
  const handleTogglePreview = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPreview((s) => !s);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl bg-zinc-950 text-zinc-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={-1}
      aria-describedby={`${p.id}-desc`}
    >
      {p.tag && <Badge>{p.tag}</Badge>}
      <ZenWatermark />

      <div className="relative aspect-[4/5] overflow-hidden">
        {/* Crossfading images: primary (base) + hover (overlay) */}
        {/* base image */}
        <motion.img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className={`h-full w-full object-cover object-center transition-transform duration-500 ${
            !hoverSrc ? (isPreview ? "scale-105" : "") : ""
          }`}
          style={{ position: "absolute", inset: 0 }}
          animate={{ opacity: isPreview && hoverSrc ? 0 : 1 }}
          transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
          // ensure image doesn't block interactions
          aria-hidden={isPreview && !!hoverSrc}
          // pointer-events none so buttons stay clickable
          // eslint-disable-next-line react/no-unknown-property
          {...({ "data-role": "primary-img" } as any)}
        />

        {/* hover/preview image (if exists) */}
        {hoverSrc && (
          <motion.img
            src={hoverSrc}
            alt={`${p.name} — preview`}
            loading="lazy"
            className="h-full w-full object-cover object-center"
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            animate={{ opacity: isPreview ? 1 : 0 }}
            transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
            aria-hidden={!isPreview}
          />
        )}

        {/* subtle dark gradient overlay on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Mobile small toggle for preview (visible only on small screens) */}
        <div className="absolute right-3 top-3 z-30 hidden md:block pointer-events-none" />
        <div className="absolute right-3 bottom-3 z-30 md:hidden">
          {/* visible on small screens only; toggles hover preview */}
          <button
            onClick={handleTogglePreview}
            className="rounded-full bg-black/60 px-3 py-2 text-xs text-white backdrop-blur hover:bg-black/75 focus:ring-2 focus:ring-white/30"
            aria-pressed={isPreview}
            aria-label={isPreview ? "Скрыть превью" : "Показать превью"}
          >
            {isPreview ? "Скрыть" : "Превью"}
          </button>
        </div>

        <div className="absolute inset-x-3 bottom-3 flex translate-y-4 items-center justify-between gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-auto">
          <button className="w-full rounded-xl bg-white/95 px-4 py-2 text-sm font-semibold text-zinc-900 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/50">
            In Bucket
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
              <span className="truncate">Размеры: {p.sizes.join(" ")}</span>
            )}
          </div>
        </div>
        <Price value={p.price} />
      </div>
    </motion.div>
  );
}

/* ------------------------------
   CatalogSection (contains Smart Background Morph)
   - uses morphColor state (we keep this from previous change)
   ------------------------------ */
export function CatalogSection({
  title = "Cataloge",
  products = PRODUCTS,
  highlight = "Streetwear with puirity of mindset",
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

  // === morph color state (Smart Background Morphing)
  const [morphColor, setMorphColor] = useState<string | undefined>(undefined);

  // background fallback if none hovered
  const fallback = "rgba(255,255,255,0.02)";

  // convert color hex to subtle rgba for the gradient when needed
  const gradientColor = morphColor ? hexToRgba(morphColor, 0.10) : fallback;

  return (
    <section className="relative mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Existing decorative background layers kept as-is */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_35%_at_50%_0%,rgba(255,255,255,0.08),rgba(0,0,0,0)_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'120\\' height=\\'120\\' viewBox=\\'0 0 120 120\\'><defs><filter id=\\'n\\'><feTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.65\\' numOctaves=\\'2\\' stitchTiles=\\'stitch\\'/><feColorMatrix type=\\'saturate\\' values=\\'0\\'/></filter></defs><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\' opacity=\\'0.3\\'/></svg>')",
          }}
        />
      </div>

      {/* Smart Background Morphing: motion layer that morphs to current color */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-20 pointer-events-none"
        animate={{
          // animate a radial gradient using current morph color
          background: `radial-gradient(60% 35% at 50% 0%, ${gradientColor} 0%, rgba(0,0,0,0) 60%)`,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          backgroundBlendMode: "overlay",
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
          <ProductCard
            key={p.id}
            p={p}
            // keep reporting colors to CatalogSection so morphing works
            onHoverColor={(c) => {
              if (c) setMorphColor(c);
              else setMorphColor(undefined);
            }}
          />
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