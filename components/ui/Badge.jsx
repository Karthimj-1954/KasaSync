'use client';

import React from 'react';
import { cn, getStatusBadgeColor } from '../../lib/utils';

export default function Badge({ children, status, className }) {
  const colorStyle = status ? getStatusBadgeColor(status) : 'bg-blue-500/20 text-blue-400 border-blue-500/30';

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-md shadow-sm',
        colorStyle,
        className
      )}
    >
      {children || status}
    </span>
  );
}
