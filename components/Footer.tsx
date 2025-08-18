"use client";
import { motion } from "framer-motion";

const SiteFooter: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mt-20 border-t border-white/10 bg-black py-10 relative overflow-hidden"
    >
      {/* Параллакс-свет за футером */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-80 w-80 rounded-full bg-gradient-to-r from-indigo-400/20 to-purple-400/20 blur-3xl"></div>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">SOCIALS</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              {["Instagram", "TikTok", "Pinterest"].map((social, i) => (
                <motion.li
                  key={i}
                  whileHover={{ scale: 1.05, x: 6 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <a href="#" className="hover:text-white">
                    {social}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} Monkey Monk. Все права защищены.
          </p>
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            {["Политика конфиденциальности", "Доставка и возврат", "Условия"].map(
              (link, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, color: "#fff" }}
                  className="hover:text-white"
                >
                  {link}
                </motion.a>
              )
            )}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default SiteFooter;