/**
 * Submit Complaint Page
 * Form for citizens to file new complaints
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import complaintService from '../services/complaintService';
import { useLanguage } from '../i18n/LanguageContext';

const SubmitComplaint = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'noise',
    description: '',
    location: '',
    image: null
  });
  const { t } = useLanguage();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Store file
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate inputs
      if (!formData.title || !formData.description || !formData.location) {
        throw new Error(t('submit.validationRequired'));
      }

      if (formData.title.length < 5) {
        throw new Error(t('submit.validationTitleLength'));
      }

      if (formData.description.length < 10) {
        throw new Error(t('submit.validationDescriptionLength'));
      }

      // Create FormData for multipart upload
      const submitFormData = new FormData();
      submitFormData.append('title', formData.title);
      submitFormData.append('category', formData.category);
      submitFormData.append('description', formData.description);
      submitFormData.append('location', formData.location);
      if (formData.image) {
        submitFormData.append('image', formData.image);
      }

      console.log('📤 Submitting complaint...');
      console.log('Title:', formData.title);
      console.log('Category:', formData.category);
      console.log('Has image:', !!formData.image);

      // Submit complaint
      const response = await complaintService.createComplaint(submitFormData);

      console.log('✅ Complaint submitted successfully:', response);

      // Show success and redirect
      alert('✅ ' + response.message);
      navigate('/my-complaints');
    } catch (err) {
      console.error('❌ Error submitting complaint:', err);
      setError(err.message || t('submit.submitFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-dark mb-2">
            📝 {t('submit.title')}
          </h1>
          <p className="text-light">
            {t('submit.subtitle')}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                {t('submit.complaintTitle')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder={t('submit.titlePlaceholder')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
                maxLength={100}
              />
              <p className="text-xs text-light mt-1">
                {t('submit.titleCount', { count: formData.title.length })}
              </p>
            </div>

            {/* Category Field */}
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                {t('submit.category')} <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              >
                <option value="noise">🔊 {t('submit.categoryNoise')}</option>
                <option value="garbage">🗑️ {t('submit.categoryGarbage')}</option>
                <option value="water">💧 {t('submit.categoryWater')}</option>
              </select>
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                {t('submit.description')} <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder={t('submit.descriptionPlaceholder')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-32"
                disabled={loading}
                maxLength={1000}
              />
              <p className="text-xs text-light mt-1">
                {t('submit.descriptionCount', { count: formData.description.length })}
              </p>
            </div>

            {/* Location Field */}
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                {t('submit.location')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder={t('submit.locationPlaceholder')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
                maxLength={200}
              />
              <p className="text-xs text-light mt-1">
                {t('submit.locationHelp')}
              </p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                {t('submit.upload')} <span className="text-gray-500">({t('submit.optional')})</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {imagePreview ? (
                  <div>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full max-h-64 object-cover rounded-lg mb-4"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData(prev => ({ ...prev, image: null }));
                      }}
                      className="text-red-600 hover:text-red-800 text-sm font-semibold"
                    >
                      {t('submit.removeImage')}
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      id="image"
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                      disabled={loading}
                    />
                    <label
                      htmlFor="image"
                      className="cursor-pointer"
                    >
                      <div className="text-5xl mb-3">📸</div>
                      <p className="font-semibold text-dark">
                        {t('submit.uploadHintTitle')}
                      </p>
                      <p className="text-sm text-light">
                        {t('submit.uploadHintTypes')}
                      </p>
                    </label>
                  </div>
                )}
              </div>
              <p className="text-xs text-light mt-2">
                💡 {t('submit.tip')}
              </p>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 text-primary mt-1"
                required
                disabled={loading}
              />
              <label htmlFor="terms" className="ml-3 text-sm text-dark">
                {t('submit.confirmation')}
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
              >
                {loading ? `⏳ ${t('submit.submitting')}` : `✅ ${t('submit.submit')}`}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                disabled={loading}
                className="px-6 bg-gray-300 hover:bg-gray-400 text-dark font-bold py-3 rounded-lg transition"
              >
                {t('submit.cancel')}
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8 border-l-4 border-primary">
          <h3 className="font-bold text-dark mb-3">✨ {t('submit.tipsTitle')}</h3>
          <ul className="space-y-2 text-sm text-dark">
            <li>✓ {t('submit.tip1')}</li>
            <li>✓ {t('submit.tip2')}</li>
            <li>✓ {t('submit.tip3')}</li>
            <li>✓ {t('submit.tip4')}</li>
            <li>✓ {t('submit.tip5')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubmitComplaint;
