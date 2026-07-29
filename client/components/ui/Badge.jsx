'use client';

import React from 'react';
import { cn } from '../../lib/utils';

export default function Badge({ children, status, className }) {
  const getBadgeStyle = (status) => {
    switch (status) {
      case 'Available':
      case 'Completed':
      case 'Confirmed':
        return 'bg-[#2E8B57]/10 text-[#2E8B57] border border-[#2E8B57]/30';
      case 'Occupied':
      case 'In Progress':
      case 'Accepted':
        return 'bg-[#3E7CB1]/10 text-[#3E7CB1] border border-[#3E7CB1]/30';
      case 'Pending':
      case 'Under Maintenance':
      case 'Assigned':
        return 'bg-[#C68A00]/10 text-[#C68A00] border border-[#C68A00]/30';
      case 'Rejected':
      case 'Cancelled':
      case 'Emergency':
        return 'bg-[#D14343]/10 text-[#D14343] border border-[#D14343]/30';
      default:
        return 'bg-[#6B7A90]/10 text-[#6B7A90] border border-[#6B7A90]/30';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider',
        getBadgeStyle(status || children),
        className
      )}
    >
      {children || status}
    </span>
  );
}
