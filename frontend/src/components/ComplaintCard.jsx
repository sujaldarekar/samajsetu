/**
 * Complaint Card Component
 * Displays a single complaint in card format
 * Used in complaint lists and dashboards
 */

import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

const ComplaintCard = ({ complaint, onActionClick = null, actionLabel = 'View Details' }) => {
  const categoryIcons = {
    noise: '🔊',
    garbage: '🗑️',
    water: '💧'
  };

  const categoryLabels = {
    noise: 'Noise Pollution',
    garbage: 'Garbage/Cleanliness',
    water: 'Water Supply'
  };

  const handleAction = () => {
    if (onActionClick) {
      onActionClick(complaint._id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-5 border-l-4 border-primary">
      {/* Header with Category and Status */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-dark line-clamp-2">
            {complaint.title}
          </h3>
          <span className="text-sm text-light">
            {categoryIcons[complaint.category]} {categoryLabels[complaint.category]}
          </span>
        </div>
        <StatusBadge status={complaint.status} />
      </div>

      {/* Description - Limited to 2 lines */}
      <p className="text-sm text-dark mb-3 line-clamp-2">
        {complaint.description}
      </p>

      {/* Location */}
      <div className="flex items-center text-sm text-light mb-3">
        <span className="mr-2">📍</span>
        {complaint.location}
      </div>

      {/* Image if available */}
      {complaint.imageUrl && (
        <div className="mb-3">
          <img
            src={complaint.imageUrl}
            alt="Complaint proof"
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Metadata Footer */}
      <div className="flex justify-between items-center text-xs text-light border-t pt-3">
        <div>
          📅 {new Date(complaint.createdAt).toLocaleDateString()}
        </div>
        <button
          onClick={handleAction}
          className="text-primary hover:text-blue-700 font-semibold transition"
        >
          {actionLabel} →
        </button>
      </div>
    </div>
  );
};

export default ComplaintCard;
