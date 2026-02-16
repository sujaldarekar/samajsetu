/**
 * My Complaints Page
 * Shows all complaints submitted by the logged-in citizen
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ComplaintCard from '../components/ComplaintCard';
import complaintService from '../services/complaintService';
import { useLanguage } from '../i18n/LanguageContext';

const MyComplaints = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { t } = useLanguage();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await complaintService.getMyComplaints();
      setComplaints(response.complaints || []);
    } catch (err) {
      setError(err.message || t('errors.failedToLoadComplaints'));
    } finally {
      setLoading(false);
    }
  };

  const filteredComplaints = filterStatus === 'all'
    ? complaints
    : complaints.filter(c => c.status === filterStatus);

  const statusLabelMap = {
    all: t('myComplaints.filterAll'),
    pending: t('myComplaints.filterPending'),
    'in-progress': t('myComplaints.filterInProgress'),
    resolved: t('myComplaints.filterResolved')
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-dark mb-2 flex items-center gap-2">
              <span className="text-2xl" aria-hidden="true">🕒</span>
              {t('myComplaints.title')}
            </h1>
            <p className="text-light">
              {t('myComplaints.subtitle')}
            </p>
          </div>
          <button
            onClick={() => navigate('/submit-complaint')}
            className="bg-secondary hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition"
          >
            📝 {t('myComplaints.newComplaint')}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            ❌ {error}
          </div>
        )}

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['all', 'pending', 'in-progress', 'resolved'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                filterStatus === status
                  ? 'bg-primary text-white'
                  : 'bg-white text-dark border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {status === 'all' ? `📊 ${t('myComplaints.filterAll')}` : ''}
              {status === 'pending' ? `⏳ ${t('myComplaints.filterPending')}` : ''}
              {status === 'in-progress' ? `🔄 ${t('myComplaints.filterInProgress')}` : ''}
              {status === 'resolved' ? `✅ ${t('myComplaints.filterResolved')}` : ''}
            </button>
          ))}
        </div>

        {/* Complaints Grid */}
        {filteredComplaints.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComplaints.map(complaint => (
              <ComplaintCard
                key={complaint._id}
                complaint={complaint}
                actionLabel={t('complaint.viewDetails')}
                onActionClick={(id) => navigate(`/complaint/${id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-bold text-dark mb-2">
              {t('myComplaints.noComplaintsTitle')}
            </h2>
            <p className="text-light mb-6">
              {filterStatus === 'all'
                ? t('myComplaints.noComplaintsAll')
                : t('myComplaints.noComplaintsByStatus', { status: statusLabelMap[filterStatus] })}
            </p>
            <button
              onClick={() => navigate('/submit-complaint')}
              className="bg-primary hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition"
            >
              📝 {t('myComplaints.submitFirst')}
            </button>
          </div>
        )}

        {/* Stats */}
        {complaints.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-dark mb-2">
                {complaints.length}
              </div>
              <p className="text-light text-sm">{t('myComplaints.totalComplaints')}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-6 text-center shadow-md border-l-4 border-yellow-400">
              <div className="text-3xl font-bold text-yellow-700 mb-2">
                {complaints.filter(c => c.status === 'pending').length}
              </div>
              <p className="text-light text-sm">{t('myComplaints.pending')}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 text-center shadow-md border-l-4 border-primary">
              <div className="text-3xl font-bold text-primary mb-2">
                {complaints.filter(c => c.status === 'in-progress').length}
              </div>
              <p className="text-light text-sm">{t('myComplaints.inProgress')}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center shadow-md border-l-4 border-secondary">
              <div className="text-3xl font-bold text-secondary mb-2">
                {complaints.filter(c => c.status === 'resolved').length}
              </div>
              <p className="text-light text-sm">{t('myComplaints.resolved')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyComplaints;
