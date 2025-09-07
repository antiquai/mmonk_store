'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Image from 'next/image';
import { section } from 'framer-motion/client';

const DonateCard = () => {
  return (
    <section className='flex justify-between items-center p-15 sm:max-w-[420px] m'>

        <div className="relative mb-12 text-center">
            <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl"
            >
            Donate to Monkeys
            </motion.h2>
            <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mt-3 text-base text-zinc-400"
            >
            Information of this cards is real card ! If you want to help us make a new products , you can donate us :)
            </motion.p>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 ">
            <div className="flex-1 flex justify-center items-center ">
                <Tilt glareEnable={true} glareMaxOpacity={0.3} scale={1.05} tiltMaxAngleX={10} tiltMaxAngleY={10}>
                    <motion.div
                    className="w-[400px] h-[250px] rounded-2xl p-4 bg-white backdrop-blur-xl border border-white/40 shadow-lg text-black overflow-hidden sm:p-4"
                    whileHover={{ scale: 1.05 }}
                    >

                    <div className="absolute z-0 top-0 right-0 sm:w-24" >
                    <Image
                        src="/dragon_mm.jpg" // Replace with your actual image path
                        alt="Card background"
                        // fill
                        width={175}
                        height={125}
                        className="object-cover"
                        quality={100}
                        priority
                    />
                    {/* absolute can be insert into classname below */}
                    <div className="inset-0 bg-white/30 backdrop-blur-sm z-10" />
                    </div>
                        
                    <div className="flex justify-between relative">
                        <div>
                            <h3 className="text-lg font-bold">ssffoo</h3>
                            <p className="text-sm">Sparkasse</p>
                        </div>
                    </div>
                    <div className='relative top-14'>
                        <div className="flex justify-between mt-4 text-sm">
                            <p>Yelysei Kudelia</p>
                        </div>
                        <div className="mt-6 tracking-widest text-l font-mono flex justify-between">
                            <p>DE27 2925 0000 1030 2508 20</p> 
                            
                            <p>12/28</p>
                        </div>
                    </div>
                    </motion.div>
                </Tilt>
            </div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6">
            <div className="flex-1 flex justify-center items-center">
                <Tilt glareEnable={true} glareMaxOpacity={0.3} scale={1.05} tiltMaxAngleX={10} tiltMaxAngleY={10}>
                    <motion.div
                    className="w-[400px] h-[250px] rounded-2xl p-4 bg-[#fef9f3] backdrop-blur-xl border border-white/40 shadow-lg text-black overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    >

                    <div className="absolute z-0 top-0 right-0" >
                    <Image
                        src="/buddha.jpg" // Replace with your actual image path
                        alt="Card background"
                        // fill
                        width={175}
                        height={125}
                        className="object-cover"
                        quality={100}
                        priority
                    />
                    {/* absolute can be insert into classname below */}
                    <div className="inset-0 bg-white/30 backdrop-blur-sm z-10" />
                    </div>
                        
                    <div className="flex justify-between relative">
                        <div>
                            <h3 className="text-lg font-bold">ssffoo</h3>
                            <p className="text-sm">VISA</p>
                        </div>
                    </div>
                    <div className='relative top-14'>
                        <div className="flex justify-between mt-4 text-sm">
                            <p>Yelysei Kudelia</p>
                        </div>
                        <div className="mt-6 tracking-widest text-l font-mono flex justify-between">
                            <p>4165 9834 2504 7545</p> 
                            
                            <p>05/30</p>
                        </div>
                    </div>
                    </motion.div>
                </Tilt>
            </div>
        </div>
    </section>
  )
}

export default DonateCard

