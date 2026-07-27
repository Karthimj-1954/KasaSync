'use client';

import React from 'react';
import { cn } from '../../lib/utils';

export default function Input({
  label,
  error,
  icon: Icon,
  className,
  id,
  type = 'text',
  ...props
}) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={id}
          type={type}
          className={cn(
            'w-full glass-input rounded-xl px-4 py-2.5 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder:text-slate-500',
            Icon && 'pl-10',
            error && 'border-rose-500/80 focus:ring-rose-500/40',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
    </div>
  );
}
