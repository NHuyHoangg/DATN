import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export function useSheetsData() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create axios instance with default config
  const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Handle API errors
  const handleError = useCallback((err) => {
    console.error('API Error:', err);
    
    if (err.response) {
      // Server responded with error status
      const message = err.response.data?.message || `Server error: ${err.response.status}`;
      setError(message);
    } else if (err.request) {
      // Network error
      setError('Network error. Please check your connection and try again.');
    } else {
      // Other error
      setError(err.message || 'An unexpected error occurred');
    }
  }, []);

  // Fetch all records
  const fetchRecords = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/sheets');
      
      if (response.data?.success) {
        setRecords(response.data.data || []);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [api, handleError]);

  // Create a new record
  const createRecord = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/sheets', data);
      
      if (response.data?.success) {
        // Add the new record to the local state
        setRecords(prev => [...prev, response.data.data]);
        return response.data.data;
      } 
        throw new Error(response.data?.message || 'Failed to create record');
      
    } catch (err) {
      handleError(err);
      throw err; // Re-throw so the component can handle it
    } finally {
      setLoading(false);
    }
  }, [api, handleError]);

  // Update an existing record
  const updateRecord = useCallback(async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.put(`/sheets/${id}`, data);
      
      if (response.data?.success) {
        // Update the record in local state
        setRecords(prev => 
          prev.map(record => 
            record.id === id ? { ...record, ...response.data.data } : record
          )
        );
        return response.data.data;
      } 
        throw new Error(response.data?.message || 'Failed to update record');
      
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api, handleError]);

  // Delete a record
  const deleteRecord = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.delete(`/sheets/${id}`);
      
      if (response.data?.success) {
        // Remove the record from local state
        setRecords(prev => prev.filter(record => record.id !== id));
        return response.data.data;
      } 
        throw new Error(response.data?.message || 'Failed to delete record');
      
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api, handleError]);

  // Get a single record
  const getRecord = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get(`/sheets/${id}`);
      
      if (response.data?.success) {
        return response.data.data;
      } 
        throw new Error(response.data?.message || 'Failed to fetch record');
      
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api, handleError]);

  // Refresh data
  const refreshData = useCallback(() => {
    fetchRecords();
  }, [fetchRecords]);

  // Initial data fetch
  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return {
    records,
    loading,
    error,
    createRecord,
    updateRecord,
    deleteRecord,
    getRecord,
    refreshData,
  };
}