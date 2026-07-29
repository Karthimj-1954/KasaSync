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
        <label className="block text-xs font-bold uppercase tracking-wider text-[#34495E]">
          {label} {required && <span className="text-[#D14343]">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-[#6B7A90] pointer-events-none">
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
            'w-full bg-white border-1.5 border-[#C7D7EA] text-[#1F2937] placeholder-[#94A3B8] rounded-[12px] text-xs font-normal px-3.5 py-2.5 transition-all duration-200 focus:outline-none focus:border-[#7AA7D9] focus:ring-4 focus:ring-[#7AA7D9]/20',
            Icon && 'pl-10',
            error && 'border-[#D14343] focus:border-[#D14343] focus:ring-[#D14343]/20',
            className
          )}
          {...props}
        />
      </div>

      {error && <p className="text-[11px] text-[#D14343] font-medium">{error}</p>}
    </div>
  );
}
