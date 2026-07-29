'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-[14px] transition-all duration-250 focus:outline-none focus:ring-2 focus:ring-[#78A4CB]/40 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-[#78A4CB] hover:bg-[#5E91BA] text-white shadow-md shadow-[#78A4CB]/25',
    emerald: 'bg-[#78A4CB] hover:bg-[#5E91BA] text-white shadow-md shadow-[#78A4CB]/25',
    secondary: 'bg-[#95BDD7] hover:bg-[#78A4CB] text-[#24425C] hover:text-white',
    outline: 'bg-white border-1.5 border-[#78A4CB] text-[#365E7C] hover:bg-[#B4E1EB] hover:text-[#24425C]',
    ghost: 'text-[#365E7C] hover:bg-[#B4E1EB]/50 hover:text-[#24425C]',
    danger: 'bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20',
  };

  const sizes = {
    sm: 'px-3.5 py-2 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
