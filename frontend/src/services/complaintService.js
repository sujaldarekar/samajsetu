/**
 * Complaint Service
 * Handle all complaint-related API calls
 */

import apiClient from './api';

const complaintService = {
  /**
   * Create a new complaint
   * @param {Object} formData - Form data including image
   */
  createComplaint: async (formData) => {
    try {
      const response = await apiClient.post(
        '/complaints/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create complaint' };
    }
  },

  /**
   * Get logged-in citizen's complaints
   */
  getMyComplaints: async () => {
    try {
      const response = await apiClient.get('/complaints/my-complaints');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch complaints' };
    }
  },

  /**
   * Get single complaint by ID
   * @param {string} id - Complaint ID
   */
  getComplaintById: async (id) => {
    try {
      const response = await apiClient.get(`/complaints/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch complaint' };
    }
  },

  /**
   * Admin: Get all complaints
   * @param {string} category - Filter by category
   * @param {string} status - Filter by status
   */
  getAllComplaints: async (category = '', status = '') => {
    try {
      let url = '/admin/complaints';
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (status) params.append('status', status);
      if (params.toString()) url += `?${params.toString()}`;
      
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch complaints' };
    }
  },

  /**
   * Admin: Update complaint status
   * @param {string} id - Complaint ID
   * @param {string} status - New status
   */
  updateComplaintStatus: async (id, status) => {
    try {
      const response = await apiClient.patch(
        `/admin/complaints/${id}/status`,
        { status }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update status' };
    }
  },

  /**
   * Admin: Get dashboard statistics
   */
  getDashboardStats: async () => {
    try {
      const response = await apiClient.get('/admin/dashboard/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch statistics' };
    }
  },

  /**
   * Admin: Get complaint detail
   * @param {string} id - Complaint ID
   */
  getComplaintDetail: async (id) => {
    try {
      const response = await apiClient.get(`/admin/complaints/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch complaint details' };
    }
  },

  /**
   * Admin: Add note to complaint
   * @param {string} id - Complaint ID
   * @param {string} note - Note text
   */
  addAdminNote: async (id, note) => {
    try {
      const response = await apiClient.post(
        `/admin/complaints/${id}/notes`,
        { note }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add note' };
    }
  },

  /**
   * Admin: Update complaint priority
   * @param {string} id - Complaint ID
   * @param {string} priority - Priority level: low, medium, high
   */
  updateComplaintPriority: async (id, priority) => {
    try {
      const response = await apiClient.patch(
        `/admin/complaints/${id}/priority`,
        { priority }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update priority' };
    }
  },

  /**
   * Admin: Assign complaint to admin
   * @param {string} id - Complaint ID
   * @param {string} assignedTo - Admin user ID (or null to unassign)
   */
  assignComplaint: async (id, assignedTo) => {
    try {
      const response = await apiClient.patch(
        `/admin/complaints/${id}/assign`,
        { assignedTo }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to assign complaint' };
    }
  }
};

export default complaintService;
