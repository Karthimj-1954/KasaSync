'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ isOpen = true, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#183153]/40 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative z-10 w-full max-w-xl bg-white rounded-[20px] p-6 shadow-2xl border border-[#EAF3FA] max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#EAF3FA]">
            <h3 className="text-lg font-bold text-[#183153] font-poppins">{title}</h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-[#EAF3FA] text-[#6B7A90] hover:text-[#183153] transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="pt-4">{children}</div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
