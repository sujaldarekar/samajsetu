/**
 * Status Badge Component
 * Shows the current status of a complaint with color coding
 */

const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      icon: '⏳',
      label: 'Pending'
    },
    'in-progress': {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      icon: '🔄',
      label: 'In Progress'
    },
    resolved: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: '✅',
      label: 'Resolved'
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
