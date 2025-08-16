'use client';

import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';


const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Hero = () => {
  return (
    <section className="rounded-b-md h-auto w-auto bg-gradient-to-br flex items-center justify-center">
        <Image
          src="/back_o.png"
          alt="Hero Image"
          width={900}
          height={500}
          className="h-screen w-screen static rounded-lg blur-lg"/>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        variants={fadeUp}
        className="top-[200px] absolute text-center flex flex-col"
      >

        <Image src="/m_only.png" alt='monkey' width={290} height={300}/><br />
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          variants={fadeUp}
        >  
          <h1 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">!Hello!</h1>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            variants={fadeUp}
          >
            <h2 className='text-l font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]'>We are MonkeyMonk© Team</h2>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero