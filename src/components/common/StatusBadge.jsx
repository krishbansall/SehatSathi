import React from 'react';
import { Clock, CheckCircle2, CheckCheck, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const StatusBadge = ({ status }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case 'Pending':
        return {
          bg: 'bg-[var(--warning)]/15 text-[var(--warning)] border-[var(--warning)]/30',
          icon: <Clock className="w-3.5 h-3.5 mr-1 text-[var(--warning)] animate-pulse" />,
          label: 'Pending',
          isPending: true
        };
      case 'Confirmed':
        return {
          bg: 'bg-[var(--success)]/15 text-[var(--success)] border-[var(--success)]/30',
          icon: <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-[var(--success)]" />,
          label: 'Confirmed',
          isPending: false
        };
      case 'Completed':
        return {
          bg: 'bg-[var(--success)]/15 text-[var(--success)] border-[var(--success)]/30',
          icon: <CheckCheck className="w-3.5 h-3.5 mr-1 text-[var(--success)]" />,
          label: 'Completed',
          isPending: false
        };
      case 'Cancelled':
        return {
          bg: 'bg-[var(--danger)]/15 text-[var(--danger)] border-[var(--danger)]/30',
          icon: <XCircle className="w-3.5 h-3.5 mr-1 text-[var(--danger)]" />,
          label: 'Cancelled',
          isPending: false
        };
      default:
        return {
          bg: 'bg-[var(--text-muted)]/15 text-[var(--text-muted)] border-[var(--border)]',
          icon: null,
          label: status,
          isPending: false
        };
    }
  };

  const style = getBadgeStyle();

  if (style.isPending) {
    return (
      <motion.span
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${style.bg} transition-all duration-200`}
      >
        {style.icon}
        {style.label}
      </motion.span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${style.bg} transition-all duration-200`}
    >
      {style.icon}
      {style.label}
    </span>
  );
};

export default StatusBadge;
