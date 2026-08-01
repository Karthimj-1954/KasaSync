import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
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

export function formatRelativeTime(dateInput) {
  if (!dateInput) return 'Recently';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return String(dateInput);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 30) return 'Just now';
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  return formatDate(dateInput);
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

export function getActivityMeta(type = '', action = '') {
  const normType = (type || '').toUpperCase();
  const normAction = (action || '').toUpperCase();

  if (normType === 'PROPERTY' || normAction.includes('PROPERTY')) {
    return {
      typeLabel: 'Property',
      iconName: 'FiHome',
      badgeClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      iconContainerClass: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    };
  }
  if (normType === 'MAINTENANCE' || normAction.includes('MAINTENANCE')) {
    return {
      typeLabel: 'Maintenance',
      iconName: 'FiTool',
      badgeClass: 'bg-amber-50 text-amber-700 border border-amber-200',
      iconContainerClass: 'bg-amber-50 text-amber-600 border border-amber-200',
    };
  }
  if (normType === 'BOOKING' || normAction.includes('BOOKING')) {
    return {
      typeLabel: 'Booking',
      iconName: 'FiCalendar',
      badgeClass: 'bg-blue-50 text-blue-700 border border-blue-200',
      iconContainerClass: 'bg-blue-50 text-blue-600 border border-blue-200',
    };
  }
  if (normType === 'MESSAGE' || normAction.includes('MESSAGE')) {
    return {
      typeLabel: 'Message',
      iconName: 'FiMessageSquare',
      badgeClass: 'bg-purple-50 text-purple-700 border border-purple-200',
      iconContainerClass: 'bg-purple-50 text-purple-600 border border-purple-200',
    };
  }
  if (normType === 'SECURITY' || normType === 'USER' || normAction.includes('LOGIN') || normAction.includes('USER') || normAction.includes('REGISTER')) {
    return {
      typeLabel: 'Security',
      iconName: 'FiShield',
      badgeClass: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
      iconContainerClass: 'bg-indigo-50 text-indigo-600 border border-indigo-200',
    };
  }
  if (normType === 'ANALYTICS' || normAction.includes('ANALYTICS') || normAction.includes('REPORT')) {
    return {
      typeLabel: 'Analytics',
      iconName: 'FiActivity',
      badgeClass: 'bg-[#EAF3FA] text-[#2B5F9E] border border-[#D6E4F2]',
      iconContainerClass: 'bg-[#EAF3FA] text-[#2B5F9E] border border-[#D6E4F2]',
    };
  }
  if (normType === 'AMENITY' || normAction.includes('AMENITY')) {
    return {
      typeLabel: 'Amenity',
      iconName: 'FiCoffee',
      badgeClass: 'bg-teal-50 text-teal-700 border border-teal-200',
      iconContainerClass: 'bg-teal-50 text-teal-600 border border-teal-200',
    };
  }
  return {
    typeLabel: 'System',
    iconName: 'FiClock',
    badgeClass: 'bg-slate-100 text-slate-700 border border-slate-200',
    iconContainerClass: 'bg-slate-100 text-slate-600 border border-slate-200',
  };
}
