import React from 'react';

/**
 * LoadingIndicator component with multiple variants
 * @param {Object} props
 * @param {string} props.variant - 'fullscreen', 'inline', 'button', or 'skeleton'
 * @param {string} props.size - 'sm', 'md', or 'lg'
 * @param {string} props.text - Optional loading text
 * @param {string} props.className - Additional CSS classes
 */
export function LoadingIndicator({ 
  variant = 'inline', 
  size = 'md', 
  text = 'Loading...', 
  className = '',
  count = 3,
  ...props 
}) {
  // Size mappings
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const spinnerSize = sizeMap[size] || sizeMap.md;
  
  // Spinner component
  const Spinner = () => (
    <div className={`animate-spin rounded-full border-t-2 border-b-2 border-primary ${spinnerSize}`} />
  );

  // Skeleton loader
  if (variant === 'skeleton') {
    return (
      <div className={`space-y-2 ${className}`} {...props}>
        {[...Array(count)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded-lg w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  // Full screen overlay
  if (variant === 'fullscreen') {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50" {...props}>
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <Spinner />
          {text && <p className="mt-3 text-textSecondary">{text}</p>}
        </div>
      </div>
    );
  }

  // Button loading state
  if (variant === 'button') {
    return (
      <div className="flex items-center justify-center" {...props}>
        <Spinner />
      </div>
    );
  }

  // Default inline loading
  return (
    <div className={`flex items-center space-x-2 ${className}`} {...props}>
      <Spinner />
      {text && <span className="text-textSecondary text-sm">{text}</span>}
    </div>
  );
}

