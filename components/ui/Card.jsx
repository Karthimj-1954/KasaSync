'use client';

import React from 'react';
import { cn } from '../../lib/utils';

export function Card({ className, hover = true, children, ...props }) {
  return (
    <div
      className={cn(
        'bg-white border border-[#E7EEF4] rounded-[20px] p-6 shadow-sm shadow-slate-200/50 transition-all duration-300',
        hover && 'hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#78A4CB]/10 hover:border-[#95BDD7]',
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
    <div className={cn('flex flex-col space-y-1.5 pb-4 border-b border-[#E7EEF4]', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={cn('text-lg font-bold tracking-tight text-[#24425C] font-poppins', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p className={cn('text-xs text-[#6F8190]', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn('pt-4', className)} {...props}>
      {children}
    </div>
  );
}
