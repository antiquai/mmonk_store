"use client";
import { motion } from "framer-motion";

type InfoBlock = {
  title: string;
  text: string;
  image: string;
};

const INFO_BLOCKS: InfoBlock[] = [
  {
    title: "Our Story",
    text: "Here will be the story about the philosophy and values of Monkey Monk. (placeholder)",
    image: '/sb_2.jpg',
  },
  {
    title: "Inspiration",
    text: "Here will be the inspiration and references that shaped our vision. (placeholder)",
    image: '/sb.jpg',
  },
];

export function BrandInfoSection() {
  return (
    <section className="relative mx-auto max-w-screen-2xl px-4 py-20 sm:px-6 lg:px-8 overflow-hidden">
      {/* Lotus background (decorative) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-[80%] h-[80%] text-zinc-500"
          fill="currentColor"
        >
          <path d="M256 32c18 54 49 99 90 133-41 34-72 79-90 133-18-54-49-99-90-133 41-34 72-79 90-133zm0 448c-18-54-49-99-90-133 41-34 72-79 90-133 18 54 49 99 90 133-41 34-72 79-90 133z" />
        </svg>
      </div>

      {/* Heading */}
      <div className="relative mb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Monkey Monk
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-3 text-base text-zinc-400"
        >
          A journey of mindfulness, inspiration and balance
        </motion.p>
      </div>

      {/* Info blocks */}
      <div className="space-y-24 relative">
        {INFO_BLOCKS.map((block, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.3 }}
            className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 ${
              i % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Text */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="max-w-lg"
            >
              <h3 className="text-2xl font-semibold mb-4">{block.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{block.text}</p>
            </motion.div>

            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: "0px 0px 25px rgba(255,255,255,0.15)" }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/10"
            >
              <img
                src={block.image}
                alt={block.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}