import { useState, useCallback } from 'react';

/**
 * Custom hook for managing toast notifications
 * @returns {Object} Toast management functions and state
 */
export function useToast() {
  const [toasts, setToasts] = useState([]);

  /**
   * Add a new toast notification
   * @param {Object} toast - Toast configuration
   * @param {string} toast.type - 'success', 'error', or 'info'
   * @param {string} toast.message - Message to display
   * @param {number} toast.duration - Duration in ms (default: 5000, 0 for no auto-close)
   * @param {string} toast.position - Position of toast ('top-center', 'top-right', 'bottom-center', 'bottom-right')
   */
  const addToast = useCallback((toast) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, ...toast }]);
    return id;
  }, []);

  /**
   * Remove a toast by ID
   * @param {number} id - Toast ID to remove
   */
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  /**
   * Show a success toast
   * @param {string} message - Message to display
   * @param {Object} options - Additional toast options
   */
  const showSuccess = useCallback((message, options = {}) => {
    return addToast({ type: 'success', message, ...options });
  }, [addToast]);

  /**
   * Show an error toast
   * @param {string} message - Message to display
   * @param {Object} options - Additional toast options
   */
  const showError = useCallback((message, options = {}) => {
    return addToast({ type: 'error', message, ...options });
  }, [addToast]);

  /**
   * Show an info toast
   * @param {string} message - Message to display
   * @param {Object} options - Additional toast options
   */
  const showInfo = useCallback((message, options = {}) => {
    return addToast({ type: 'info', message, ...options });
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showInfo
  };
}

