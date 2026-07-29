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
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-[14px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#7AA7D9]/40 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variants = {
    primary: 'bg-[#5E8FBF] hover:bg-[#4B7CAD] text-white shadow-md shadow-[#5E8FBF]/25',
    emerald: 'bg-[#5E8FBF] hover:bg-[#4B7CAD] text-white shadow-md shadow-[#5E8FBF]/25',
    secondary: 'bg-[#EAF3FA] hover:bg-[#C7DDF3] text-[#183153] border border-[#C7D7EA]',
    outline: 'bg-white border-1.5 border-[#5E8FBF] text-[#183153] hover:bg-[#EAF3FA] hover:text-[#2B5F9E]',
    ghost: 'text-[#425466] hover:bg-[#EAF3FA] hover:text-[#183153]',
    danger: 'bg-[#D14343] hover:bg-rose-700 text-white shadow-md shadow-rose-500/20',
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
