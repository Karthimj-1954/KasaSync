'use client';

import React from 'react';
import { cn } from '../../lib/utils';

export function Card({ className, hover = true, children, ...props }) {
  return (
    <div
      className={cn(
        'bg-white border border-[#EAF3FA] rounded-[20px] p-6 shadow-sm shadow-slate-200/40 transition-all duration-250',
        hover && 'hover:-translate-y-1 hover:shadow-xl hover:shadow-[#183153]/05 hover:border-[#C7D7EA]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn('flex flex-col space-y-1.5 pb-4 border-b border-[#EAF3FA]', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={cn('text-lg font-bold tracking-tight text-[#183153] font-poppins', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p className={cn('text-xs font-normal text-[#60758C]', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn('pt-4 text-[#425466]', className)} {...props}>
      {children}
    </div>
  );
}
