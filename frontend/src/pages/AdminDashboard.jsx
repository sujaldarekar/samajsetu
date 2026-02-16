/**
 * Admin Dashboard Page
 * Main admin panel to manage all complaints
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import StatusBadge from '../components/StatusBadge';
import complaintService from '../services/complaintService';
import authService from '../services/authService';
import { useLanguage } from '../i18n/LanguageContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    status: ''
  });
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [noteLoading, setNoteLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({});
  const { t } = useLanguage();

  const currentUser = authService.getCurrentUser();

  // Redirect if not admin
  useEffect(() => {
    if (currentUser?.role !== 'admin') {
      navigate('/');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [complaintsRes, statsRes] = await Promise.all([
        complaintService.getAllComplaints(filters.category, filters.status),
        complaintService.getDashboardStats()
      ]);
      setComplaints(complaintsRes.complaints || []);
      setStats(statsRes.stats);
    } catch (err) {
      setError(err.message || t('adminDashboard.failedToLoadData'));
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = async (complaintId) => {
    try {
      setDetailLoading(true);
      const res = await complaintService.getComplaintDetail(complaintId);
      setSelectedComplaint(res.complaint);
    } catch (err) {
      alert(`${t('adminDashboard.failedToLoadDetails')}: ${err.message}`);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleStatusUpdate = async (complaintId, newStatus) => {
    setActionLoading(prev => ({ ...prev, [complaintId]: true }));
    try {
      await complaintService.updateComplaintStatus(complaintId, newStatus);
      fetchData();
      if (selectedComplaint?._id === complaintId) {
        handleViewDetail(complaintId);
      }
    } catch (err) {
      alert(`❌ ${t('adminDashboard.failedToUpdateStatus')}: ${err.message}`);
    } finally {
      setActionLoading(prev => ({ ...prev, [complaintId]: false }));
    }
  };

  const handleAddNote = async (complaintId) => {
    if (!newNote.trim()) {
      alert(t('adminDashboard.addNoteValidation'));
      return;
    }
    setNoteLoading(true);
    try {
      const res = await complaintService.addAdminNote(complaintId, newNote);
      setSelectedComplaint(res.complaint);
      setNewNote('');
    } catch (err) {
      alert(`${t('adminDashboard.failedToAddNote')}: ${err.message}`);
    } finally {
      setNoteLoading(false);
    }
  };

  const handlePriorityChange = async (complaintId, newPriority) => {
    try {
      const res = await complaintService.updateComplaintPriority(complaintId, newPriority);
      if (selectedComplaint?._id === complaintId) {
        setSelectedComplaint(res.complaint);
      }
      fetchData();
    } catch (err) {
      alert(`${t('adminDashboard.failedToUpdatePriority')}: ${err.message}`);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high':
        return t('adminDashboard.priorityHigh');
      case 'medium':
        return t('adminDashboard.priorityMedium');
      case 'low':
        return t('adminDashboard.priorityLow');
      default:
        return priority;
    }
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      'pending': 'in-progress',
      'in-progress': 'resolved',
      'resolved': 'resolved'
    };
    return statusFlow[currentStatus];
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return t('status.pending');
      case 'in-progress':
        return t('status.inProgress');
      case 'resolved':
        return t('status.resolved');
      default:
        return status;
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ⚙️ {t('adminDashboard.title')}
          </h1>
          <p className="text-gray-600">
            {t('adminDashboard.subtitle')}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            ❌ {error}
          </div>
        )}

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stats.total}
              </div>
              <p className="text-gray-600 text-sm">{t('adminDashboard.totalComplaints')}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-6 shadow-md border-l-4 border-yellow-400">
              <div className="text-3xl font-bold text-yellow-700 mb-2">
                {stats.pending}
              </div>
              <p className="text-gray-600 text-sm">{t('adminDashboard.pending')}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 shadow-md border-l-4 border-blue-400">
              <div className="text-3xl font-bold text-blue-700 mb-2">
                {stats.inProgress}
              </div>
              <p className="text-gray-600 text-sm">{t('adminDashboard.inProgress')}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 shadow-md border-l-4 border-green-400">
              <div className="text-3xl font-bold text-green-700 mb-2">
                {stats.resolved}
              </div>
              <p className="text-gray-600 text-sm">{t('adminDashboard.resolved')}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 shadow-md border-l-4 border-purple-500">
              <div className="text-3xl font-bold text-purple-700 mb-2">
                {stats.resolutionRate}
              </div>
              <p className="text-gray-600 text-sm">{t('adminDashboard.resolutionRate')}</p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="font-bold text-gray-900 mb-4">🔍 {t('adminDashboard.filters')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                {t('adminDashboard.categoryLabel')}
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t('adminDashboard.allCategories')}</option>
                <option value="noise">🔊 {t('complaint.category.noise')}</option>
                <option value="garbage">🗑️ {t('complaint.category.garbage')}</option>
                <option value="water">💧 {t('complaint.category.water')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                {t('adminDashboard.statusLabel')}
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t('adminDashboard.allStatuses')}</option>
                <option value="pending">⏳ {t('status.pending')}</option>
                <option value="in-progress">🔄 {t('status.inProgress')}</option>
                <option value="resolved">✅ {t('status.resolved')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Complaints Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.length > 0 ? (
            complaints.map(complaint => (
              <div
                key={complaint._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleViewDetail(complaint._id)}
              >
                {/* Image Preview */}
                {complaint.imageUrl ? (
                  <img
                    src={complaint.imageUrl}
                    alt={complaint.title}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                    <span className="text-3xl">📸</span>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-4">
                  {/* Title */}
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                    {complaint.title}
                  </h3>

                  {/* Location */}
                  <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                    📍 {complaint.location}
                  </p>

                  {/* Status & Priority */}
                  <div className="flex gap-2 mb-3">
                    <StatusBadge status={complaint.status} />
                    <span className={`text-xs px-2 py-1 rounded border ${getPriorityColor(complaint.priority)} font-medium`}>
                      {getPriorityLabel(complaint.priority)}
                    </span>
                  </div>

                  {/* Citizen Info */}
                  <div className="bg-gray-50 rounded p-2 mb-3 text-xs">
                    <p className="font-semibold text-gray-900">
                      {complaint.citizen?.name}
                    </p>
                    <p className="text-gray-600">{complaint.citizen?.email}</p>
                  </div>

                  {/* Date */}
                  <p className="text-xs text-gray-500">
                    {new Date(complaint.createdAt).toLocaleDateString()} at{' '}
                    {new Date(complaint.createdAt).toLocaleTimeString()}
                  </p>

                  {/* Notes Count */}
                  {complaint.adminNotes?.length > 0 && (
                    <p className="text-xs font-semibold text-blue-600 mt-2">
                      📝 {t('adminDashboard.notesCount', { count: complaint.adminNotes.length })}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('adminDashboard.noComplaintsTitle')}
              </h2>
              <p className="text-gray-600">
                {t('adminDashboard.noComplaintsSubtitle')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full my-8">
            {detailLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {selectedComplaint.title}
                    </h2>
                    <p className="text-blue-100">📍 {selectedComplaint.location}</p>
                  </div>
                  <button
                    onClick={() => setSelectedComplaint(null)}
                    className="text-2xl hover:bg-white hover:text-blue-600 rounded-lg w-8 h-8 flex items-center justify-center transition"
                  >
                    ✕
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-6">
                  {/* Image */}
                  {selectedComplaint.imageUrl && (
                    <div>
                      <img
                        src={selectedComplaint.imageUrl}
                        alt={selectedComplaint.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Status and Priority */}
                  <div className="flex gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        {t('adminDashboard.status')}
                      </label>
                      {selectedComplaint.status !== 'resolved' ? (
                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              selectedComplaint._id,
                              getNextStatus(selectedComplaint.status)
                            )
                          }
                          disabled={actionLoading[selectedComplaint._id]}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition disabled:opacity-50"
                        >
                          {actionLoading[selectedComplaint._id]
                            ? '...'
                            : `→ ${getStatusLabel(getNextStatus(selectedComplaint.status))}`}
                        </button>
                      ) : (
                        <span className="text-green-600 font-bold">✓ {t('status.resolved')}</span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        {t('adminDashboard.priority')}
                      </label>
                      <select
                        value={selectedComplaint.priority}
                        onChange={(e) =>
                          handlePriorityChange(selectedComplaint._id, e.target.value)
                        }
                        className={`px-3 py-2 rounded border font-semibold ${getPriorityColor(
                          selectedComplaint.priority
                        )}`}
                      >
                        <option value="low">{t('adminDashboard.priorityLow')}</option>
                        <option value="medium">{t('adminDashboard.priorityMedium')}</option>
                        <option value="high">{t('adminDashboard.priorityHigh')}</option>
                      </select>
                    </div>
                  </div>

                  {/* Category and Citizen */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{t('adminDashboard.category')}</p>
                      <p className="text-gray-700">
                        {selectedComplaint.category === 'noise' && `🔊 ${t('complaint.category.noise')}`}
                        {selectedComplaint.category === 'garbage' && `🗑️ ${t('complaint.category.garbage')}`}
                        {selectedComplaint.category === 'water' && `💧 ${t('complaint.category.water')}`}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{t('adminDashboard.submittedBy')}</p>
                      <p className="text-gray-700">{selectedComplaint.citizen?.name}</p>
                      <p className="text-sm text-gray-600">
                        {selectedComplaint.citizen?.email}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">{t('adminDashboard.description')}</p>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded">
                      {selectedComplaint.description}
                    </p>
                  </div>

                  {/* Admin Notes */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                      📝 {t('adminDashboard.adminNotes')} ({selectedComplaint.adminNotes?.length || 0})
                    </h3>

                    {/* Notes List */}
                    <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                      {selectedComplaint.adminNotes?.map((note, idx) => (
                        <div
                          key={idx}
                          className="bg-blue-50 border border-blue-200 rounded p-3"
                        >
                          <p className="text-xs font-semibold text-blue-900 mb-1">
                            {note.addedBy?.name || t('nav.role.admin')} • {new Date(note.addedAt).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-800">{note.note}</p>
                        </div>
                      ))}
                    </div>

                    {/* Add Note Form */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder={t('adminDashboard.addNotePlaceholder')}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      <button
                        onClick={() => handleAddNote(selectedComplaint._id)}
                        disabled={noteLoading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition disabled:opacity-50 text-sm font-semibold"
                      >
                        {noteLoading ? '...' : t('adminDashboard.addNoteButton')}
                      </button>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 pt-4 border-t">
                    <div>
                      <p className="font-semibold text-gray-900">{t('adminDashboard.created')}</p>
                      {new Date(selectedComplaint.createdAt).toLocaleDateString()}
                    </div>
                    {selectedComplaint.resolvedAt && (
                      <div>
                        <p className="font-semibold text-gray-900">{t('adminDashboard.resolvedOn')}</p>
                        {new Date(selectedComplaint.resolvedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
