import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

/**
 * Toast notification component
 * @param {Object} props
 * @param {string} props.type - 'success', 'error', or 'info'
 * @param {string} props.message - The message to display
 * @param {function} props.onClose - Function to call when toast is closed
 * @param {number} props.duration - Duration in ms before auto-closing (0 for no auto-close)
 */
export function Toast({ 
  type = 'info', 
  message, 
  onClose, 
  duration = 5000,
  position = 'bottom-center'
}) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  // Icon based on type
  const IconComponent = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info
  }[type] || Info;

  // Colors based on type
  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }[type] || 'bg-blue-50 border-blue-200 text-blue-800';

  // Icon colors
  const iconColors = {
    success: 'text-green-500',
    error: 'text-red-500',
    info: 'text-blue-500'
  }[type] || 'text-blue-500';

  // Position classes
  const positionClasses = {
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-center': 'bottom-20 left-1/2 transform -translate-x-1/2',
    'bottom-right': 'bottom-20 right-4'
  }[position] || 'bottom-20 left-1/2 transform -translate-x-1/2';

  return (
    <div 
      className={`fixed z-50 ${positionClasses} animate-fade-in-up`}
      role="alert"
      aria-live="assertive"
    >
      <div className={`${colors} px-4 py-3 rounded-lg shadow-lg border flex items-center max-w-md`}>
        <IconComponent className={`w-5 h-5 ${iconColors} mr-3 flex-shrink-0`} />
        <div className="flex-1 mr-2 text-sm">{message}</div>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-black/5 transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

