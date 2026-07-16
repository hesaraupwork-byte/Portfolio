'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="border-t border-white/10 px-6 py-8 text-center text-sm text-[var(--muted)]"
    >
      <p>© {new Date().getFullYear()} Nadil Hesara. All rights reserved.</p>
    </motion.footer>
  );
}
