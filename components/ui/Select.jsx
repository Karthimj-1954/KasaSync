'use client';

import React from 'react';
import { cn } from '../../lib/utils';

export default function Select({
  label,
  options = [],
  value,
  onChange,
  className,
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

      <select
        value={value}
        onChange={onChange}
        required={required}
        className={cn(
          'w-full bg-white border-1.5 border-[#C7D7EA] text-[#1F2937] rounded-[12px] text-xs font-normal px-3.5 py-2.5 transition-all duration-200 focus:outline-none focus:border-[#7AA7D9] focus:ring-4 focus:ring-[#7AA7D9]/20 cursor-pointer',
          className
        )}
        {...props}
      >
        {options.map((opt, idx) => {
          const val = typeof opt === 'object' ? opt.value : opt;
          const lbl = typeof opt === 'object' ? opt.label : opt;
          return (
            <option key={idx} value={val} className="bg-white text-[#1F2937]">
              {lbl}
            </option>
          );
        })}
      </select>
    </div>
  );
}
