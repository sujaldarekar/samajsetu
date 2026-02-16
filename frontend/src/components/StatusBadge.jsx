/**
 * Status Badge Component
 * Shows the current status of a complaint with color coding
 */

import { useLanguage } from '../i18n/LanguageContext';

const StatusBadge = ({ status }) => {
  const { t } = useLanguage();
  const statusConfig = {
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      icon: '⏳',
      label: t('status.pending')
    },
    'in-progress': {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      icon: '🔄',
      label: t('status.inProgress')
    },
    resolved: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: '✅',
      label: t('status.resolved')
    }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`${config.bg} ${config.text} px-3 py-1 rounded-full text-sm font-semibold`}>
      {config.icon} {config.label}
    </span>
  );
};

export default StatusBadge;
