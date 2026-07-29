'use client';

import React from 'react';
import { cn } from '../../lib/utils';

export default function Badge({ children, status, className }) {
  const getBadgeStyle = (status) => {
    switch (status) {
      case 'Available':
      case 'Completed':
      case 'Confirmed':
        return 'bg-[#B4E1EB] text-[#24425C] border border-[#95BDD7]';
      case 'Occupied':
      case 'In Progress':
      case 'Accepted':
        return 'bg-[#95BDD7] text-[#24425C] border border-[#78A4CB]';
      case 'Pending':
      case 'Under Maintenance':
      case 'Assigned':
        return 'bg-[#F9E8A2] text-[#24425C] border border-[#E7D688]';
      case 'Rejected':
      case 'Cancelled':
        return 'bg-rose-100 text-rose-700 border border-rose-200';
      default:
        return 'bg-[#95BDD7]/30 text-[#365E7C] border border-[#95BDD7]/50';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider',
        getBadgeStyle(status || children),
        className
      )}
    >
      {children || status}
    </span>
  );
}
