import React from 'react';
import { Lock, Check } from 'lucide-react';
import { LoadingIndicator } from './LoadingIndicator';

/**
 * Premium feature card with upgrade option
 */
export function PremiumFeatureCard({
  title,
  description,
  features = [],
  price,
  ctaText = 'Upgrade',
  onUpgrade,
  isLoading = false,
  icon: Icon = Lock,
  previewComponent = null,
  gradientFrom = 'from-purple-50',
  gradientTo = 'to-blue-50',
  borderColor = 'border-purple-200',
  primaryColor = 'purple',
  secondaryColor = 'blue'
}) {
  // Dynamic color classes
  const iconBgClass = `bg-${primaryColor}-100`;
  const iconTextClass = `text-${primaryColor}-600`;
  const titleClass = `text-${primaryColor}-900`;
  const descriptionClass = `text-${primaryColor}-700`;
  const featureDotClass = `bg-${primaryColor}-400`;
  const featureTextClass = `text-${primaryColor}-800`;
  const buttonBgClass = `bg-${primaryColor}-600`;
  const buttonHoverClass = `hover:bg-${primaryColor}-700`;

  return (
    <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} border ${borderColor} rounded-lg p-6`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`${iconBgClass} p-2 rounded-full`}>
            <Icon className={`w-5 h-5 ${iconTextClass}`} />
          </div>
          <div>
            <h3 className={`font-bold ${titleClass}`}>{title}</h3>
            <p className={`text-sm ${descriptionClass}`}>
              {description}
            </p>
          </div>
        </div>
      </div>
      
      {features.length > 0 && (
        <div className="space-y-3 mb-4 text-sm">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className={`w-1.5 h-1.5 ${featureDotClass} rounded-full`}></div>
              <span className={featureTextClass}>{feature}</span>
            </div>
          ))}
        </div>
      )}

      {/* Preview component if provided */}
      {previewComponent && (
        <div className="mb-4">
          {previewComponent}
        </div>
      )}

      <button
        onClick={onUpgrade}
        disabled={isLoading}
        className={`w-full px-6 py-3 ${buttonBgClass} text-white rounded-lg ${buttonHoverClass} disabled:opacity-50 transition-colors flex items-center justify-center space-x-2`}
        aria-label={ctaText}
      >
        {isLoading ? (
          <LoadingIndicator variant="button" size="sm" />
        ) : (
          <>
            <Lock className="w-4 h-4" />
            <span>{price ? `${ctaText} for ${price}` : ctaText}</span>
          </>
        )}
      </button>
    </div>
  );
}

