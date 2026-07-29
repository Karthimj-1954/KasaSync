'use client';

import React from 'react';
import { cn } from '../../lib/utils';

export default function Input({
  label,
  error,
  icon: Icon,
  type = 'text',
  className,
  placeholder,
  value,
  onChange,
  required,
  ...props
}) {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-[#365E7C]">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-[#78A4CB] pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={cn(
            'w-full bg-white border-1.5 border-[#95BDD7] text-[#24425C] placeholder-[#7D8F9C] rounded-[12px] text-xs font-medium px-3.5 py-2.5 transition-all duration-200 focus:outline-none focus:border-[#78A4CB] focus:ring-4 focus:ring-[#78A4CB]/20',
            Icon && 'pl-10',
            error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20',
            className
          )}
          {...props}
        />
      </div>

      {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}
    </div>
  );
}
