import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price || 0);
}

export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function getStatusBadgeColor(status) {
  switch (status) {
    case 'Available':
    case 'Completed':
    case 'Confirmed':
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'Occupied':
    case 'In Progress':
    case 'Accepted':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'Pending':
    case 'Under Maintenance':
    case 'Assigned':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    case 'Rejected':
    case 'Cancelled':
      return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    default:
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
}
