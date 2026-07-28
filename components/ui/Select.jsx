'use client';

import React from 'react';
import { cn } from '../../lib/utils';

export default function Select({
  label,
  options = [],
  value,
  onChange,
  error,
  className,
  id,
  ...props
}) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={cn(
          'w-full glass-input rounded-xl px-4 py-2.5 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none bg-no-repeat bg-right text-slate-200 cursor-pointer',
          error && 'border-rose-500/80',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value || opt} value={opt.value || opt} className="bg-slate-900 text-white">
            {opt.label || opt}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
    </div>
  );
}
