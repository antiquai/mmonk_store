'use client'

import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

// Pure design version: product detail page layout without logic/state

const sampleProduct = {
  title: 'Monkey Tee',
  price: 29,
  description:
    "Minimalist streetwear tee, heavy soft cotton. Inspired by vintage prints and playful—deadstock-feel." ,
  images: [
    '/design/des_1.png',
    '/design/des_1_looped.png',
  ],
  sizes: ['S', 'M', 'L', 'XL'],
  colors: [
    { id: 'black', label: 'Black', hex: '#111827' },
    { id: 'white', label: 'White', hex: '#f9fafb' },
    { id: 'maroon', label: 'Maroon', hex: '#7f1d1d' }
  ]
}

const fadeIn = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }
const imageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  enter: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.25 } }
}

export default function ProductDetailDesign() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8 text-center">
          <img src="/logo.png" alt="logo" className="mx-auto w-28 opacity-90" />
        </div>

        <div className="grid gap-8 items-start grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="rounded-2xl overflow-hidden bg-neutral-800 p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={sampleProduct.images[0]}
                  variants={imageVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  className="relative w-full h-[520px] flex items-center justify-center"
                >
                  <Image
                    src={sampleProduct.images[0]}
                    alt="product"
                    width={900}
                    height={900}
                    className="object-contain max-h-[480px]"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="mt-4 flex gap-3 justify-center">
                {sampleProduct.images.map((src, i) => (
                  <div
                    key={i}
                    className="rounded-lg overflow-hidden w-20 h-20 border border-neutral-700"
                  >
                    <Image src={src} alt={`thumb-${i}`} width={80} height={80} className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mt-6 text-center text-sm text-neutral-400"
            >
              Free world-wide shipping over €80 • Limited drops — restocks rare
            </motion.div>
          </div>

          {/* Details */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="pt-2"
          >
            <h1 className="text-4xl font-extrabold tracking-tight mb-3">{sampleProduct.title}</h1>
            <p className="text-xl font-semibold text-[#fef9f3] mb-6">€{sampleProduct.price}.00</p>

            <p className="text-neutral-300 mb-6 max-w-xl">{sampleProduct.description}</p>

            <div className="flex flex-col gap-4 max-w-md">
              <div>
                <div className="text-xs text-neutral-400 uppercase mb-2">Size</div>
                <div className="flex gap-3">
                  {sampleProduct.sizes.map(s => (
                    <div
                      key={s}
                      className="px-3 py-2 rounded-md border bg-transparent border-neutral-700 text-neutral-300"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs text-neutral-400 uppercase mb-2">Color</div>
                <div className="flex gap-3 items-center">
                  {sampleProduct.colors.map(c => (
                    <div
                      key={c.id}
                      className="w-8 h-8 rounded-full ring-1 ring-neutral-700"
                      style={{ background: c.hex }}
                      title={c.label}
                    />
                  ))}
                  <div className="text-sm text-neutral-400">Color name</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-neutral-800 flex items-center justify-center">-</div>
                  <div className="w-10 text-center">1</div>
                  <div className="w-8 h-8 rounded bg-neutral-800 flex items-center justify-center">+</div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="ml-auto px-6 py-3 rounded-lg bg-amber-500 text-black font-semibold shadow-lg"
                >
                  Add to cart
                </motion.button>
              </div>

              <div className="text-sm text-neutral-400">Estimated delivery: 3–7 business days</div>

              <hr className="border-neutral-800 my-6" />

              <div className="mt-6 text-sm text-neutral-500">Information on the cards is real. If you want to help us make new products, you can donate us :)</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}