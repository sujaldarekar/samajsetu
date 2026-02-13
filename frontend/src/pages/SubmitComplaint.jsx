/**
 * Submit Complaint Page
 * Form for citizens to file new complaints
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import complaintService from '../services/complaintService';

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
        throw new Error('Please fill in all required fields');
      }

      if (formData.title.length < 5) {
        throw new Error('Title must be at least 5 characters');
      }

      if (formData.description.length < 10) {
        throw new Error('Description must be at least 10 characters');
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
      setError(err.message || 'Failed to submit complaint. Please check your internet connection and try again.');
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
            📝 Submit a Complaint
          </h1>
          <p className="text-light">
            Help us fix problems in your community. Be as detailed as possible.
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
                Complaint Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Loud construction noise near Main Street"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
                maxLength={100}
              />
              <p className="text-xs text-light mt-1">
                {formData.title.length}/100 characters
              </p>
            </div>

            {/* Category Field */}
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              >
                <option value="noise">🔊 Noise Pollution</option>
                <option value="garbage">🗑️ Garbage / Cleanliness</option>
                <option value="water">💧 Water Supply Problem</option>
              </select>
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Detailed Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the issue in detail... When did it start? What exactly is the problem?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-32"
                disabled={loading}
                maxLength={1000}
              />
              <p className="text-xs text-light mt-1">
                {formData.description.length}/1000 characters (minimum 10)
              </p>
            </div>

            {/* Location Field */}
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., 123 Main Street, Downtown District"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
                maxLength={200}
              />
              <p className="text-xs text-light mt-1">
                Please provide complete address for better identification
              </p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Upload Photo Proof <span className="text-gray-500">(Optional)</span>
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
                      Remove Image
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
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-light">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </label>
                  </div>
                )}
              </div>
              <p className="text-xs text-light mt-2">
                💡 Tip: Include a clear photo showing the issue for faster resolution
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
                I confirm that the information provided is true and accurate
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
              >
                {loading ? '⏳ Submitting...' : '✅ Submit Complaint'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                disabled={loading}
                className="px-6 bg-gray-300 hover:bg-gray-400 text-dark font-bold py-3 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8 border-l-4 border-primary">
          <h3 className="font-bold text-dark mb-3">✨ Tips for Better Results</h3>
          <ul className="space-y-2 text-sm text-dark">
            <li>✓ Provide clear, specific details about the problem</li>
            <li>✓ Take a clear photo from different angles</li>
            <li>✓ Mention the exact date and time of issue</li>
            <li>✓ Be polite and objective in your description</li>
            <li>✓ Include any relevant contact information</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubmitComplaint;
