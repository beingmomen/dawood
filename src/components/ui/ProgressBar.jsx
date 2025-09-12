import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProgressBar = ({
  value = 0,
  max = 100,
  min = 0,
  size = 'medium',
  variant = 'default',
  color = 'blue',
  showValue = true,
  showLabel = true,
  label = '',
  animated = true,
  striped = false,
  indeterminate = false,
  className = '',
  containerClassName = '',
  valueClassName = '',
  labelClassName = '',
  formatValue = null,
  orientation = 'horizontal', // 'horizontal' | 'vertical'
  rounded = true,
  gradient = false,
  pulse = false,
  steps = null, // Array of step values for stepped progress
  showSteps = false,
  disabled = false,
  error = false,
  success = false
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animate value changes
  useEffect(() => {
    if (animated && !indeterminate) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setIsAnimating(false);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayValue(value);
    }
  }, [value, animated, indeterminate]);

  // Calculate percentage
  const percentage = indeterminate ? 50 : Math.min(Math.max(((displayValue - min) / (max - min)) * 100, 0), 100);

  // Size configurations
  const sizeConfig = {
    small: {
      height: orientation === 'horizontal' ? 'h-2' : 'w-2',
      text: 'text-xs',
      container: orientation === 'horizontal' ? 'h-2' : 'w-2'
    },
    medium: {
      height: orientation === 'horizontal' ? 'h-3' : 'w-3',
      text: 'text-sm',
      container: orientation === 'horizontal' ? 'h-3' : 'w-3'
    },
    large: {
      height: orientation === 'horizontal' ? 'h-4' : 'w-4',
      text: 'text-base',
      container: orientation === 'horizontal' ? 'h-4' : 'w-4'
    },
    xl: {
      height: orientation === 'horizontal' ? 'h-6' : 'w-6',
      text: 'text-lg',
      container: orientation === 'horizontal' ? 'h-6' : 'w-6'
    }
  };

  // Color configurations
  const colorConfig = {
    blue: {
      bg: 'bg-blue-500',
      gradient: 'from-blue-400 to-blue-600',
      text: 'text-blue-600'
    },
    green: {
      bg: 'bg-green-500',
      gradient: 'from-green-400 to-green-600',
      text: 'text-green-600'
    },
    red: {
      bg: 'bg-red-500',
      gradient: 'from-red-400 to-red-600',
      text: 'text-red-600'
    },
    yellow: {
      bg: 'bg-yellow-500',
      gradient: 'from-yellow-400 to-yellow-600',
      text: 'text-yellow-600'
    },
    purple: {
      bg: 'bg-purple-500',
      gradient: 'from-purple-400 to-purple-600',
      text: 'text-purple-600'
    },
    gray: {
      bg: 'bg-gray-500',
      gradient: 'from-gray-400 to-gray-600',
      text: 'text-gray-600'
    }
  };

  // Get current color based on state
  const getCurrentColor = () => {
    if (error) return colorConfig.red;
    if (success) return colorConfig.green;
    return colorConfig[color] || colorConfig.blue;
  };

  const currentColor = getCurrentColor();
  const currentSize = sizeConfig[size] || sizeConfig.medium;

  // Format value for display
  const getFormattedValue = () => {
    if (formatValue) {
      return formatValue(displayValue, max, min);
    }
    return `${Math.round(percentage)}%`;
  };

  // Container classes
  const containerClasses = `
    relative
    ${orientation === 'horizontal' ? 'w-full' : 'h-full flex flex-col items-center'}
    ${containerClassName}
  `;

  // Progress bar background classes
  const backgroundClasses = `
    ${currentSize.container}
    ${orientation === 'horizontal' ? 'w-full' : 'h-full'}
    bg-gray-200 dark:bg-gray-700
    ${rounded ? 'rounded-full' : 'rounded'}
    overflow-hidden
    ${disabled ? 'opacity-50' : ''}
    ${className}
  `;

  // Progress fill classes
  const fillClasses = `
    ${currentSize.height}
    ${gradient ? `bg-gradient-to-r ${currentColor.gradient}` : currentColor.bg}
    ${rounded ? 'rounded-full' : 'rounded'}
    transition-all duration-300 ease-out
    ${striped ? 'bg-stripes' : ''}
    ${pulse ? 'animate-pulse' : ''}
    ${indeterminate ? 'animate-indeterminate' : ''}
  `;

  // Indeterminate animation styles
  const indeterminateStyles = indeterminate ? {
    animation: 'indeterminate 2s infinite linear'
  } : {};

  // Steps rendering
  const renderSteps = () => {
    if (!steps || !showSteps) return null;

    return (
      <div className={`absolute inset-0 flex ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'} justify-between items-center pointer-events-none`}>
        {steps.map((step, index) => {
          const stepPercentage = ((step - min) / (max - min)) * 100;
          const isCompleted = displayValue >= step;
          
          return (
            <div
              key={index}
              className={`
                w-2 h-2 rounded-full border-2 border-white dark:border-gray-800
                ${isCompleted ? currentColor.bg : 'bg-gray-300 dark:bg-gray-600'}
                transition-colors duration-300
              `}
              style={{
                [orientation === 'horizontal' ? 'left' : 'bottom']: `${stepPercentage}%`,
                transform: orientation === 'horizontal' ? 'translateX(-50%)' : 'translateY(50%)'
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className={containerClasses}>
      {/* Label */}
      {showLabel && label && (
        <div className={`mb-2 flex justify-between items-center ${labelClassName}`}>
          <span className={`font-medium text-gray-700 dark:text-gray-300 ${currentSize.text}`}>
            {label}
          </span>
          {showValue && (
            <span className={`${currentColor.text} ${currentSize.text} font-semibold ${valueClassName}`}>
              {getFormattedValue()}
            </span>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <div className={backgroundClasses}>
        {/* Progress Fill */}
        <motion.div
          className={fillClasses}
          style={{
            [orientation === 'horizontal' ? 'width' : 'height']: indeterminate ? '30%' : `${percentage}%`,
            ...indeterminateStyles
          }}
          initial={animated ? { [orientation === 'horizontal' ? 'width' : 'height']: '0%' } : false}
          animate={{ 
            [orientation === 'horizontal' ? 'width' : 'height']: indeterminate ? '30%' : `${percentage}%` 
          }}
          transition={{ duration: animated ? 0.5 : 0, ease: 'easeOut' }}
        />

        {/* Steps */}
        {renderSteps()}

        {/* Value overlay for larger bars */}
        {showValue && !showLabel && size !== 'small' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-white font-semibold ${currentSize.text} drop-shadow ${valueClassName}`}>
              {getFormattedValue()}
            </span>
          </div>
        )}
      </div>

      {/* Value below bar (for small sizes or when label is shown) */}
      {showValue && (showLabel || size === 'small') && (
        <div className={`mt-1 text-center ${valueClassName}`}>
          <span className={`${currentColor.text} ${currentSize.text} font-semibold`}>
            {getFormattedValue()}
          </span>
        </div>
      )}
    </div>
  );
};

// Circular Progress Component
export const CircularProgress = ({
  value = 0,
  max = 100,
  min = 0,
  size = 120,
  strokeWidth = 8,
  color = 'blue',
  backgroundColor = 'gray',
  showValue = true,
  showLabel = true,
  label = '',
  animated = true,
  indeterminate = false,
  className = '',
  valueClassName = '',
  labelClassName = '',
  formatValue = null,
  gradient = false,
  lineCap = 'round', // 'round' | 'square' | 'butt'
  direction = 'clockwise', // 'clockwise' | 'counterclockwise'
  startAngle = -90, // Starting angle in degrees
  disabled = false,
  error = false,
  success = false
}) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (animated && !indeterminate) {
      const timer = setTimeout(() => setDisplayValue(value), 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayValue(value);
    }
  }, [value, animated, indeterminate]);

  const percentage = indeterminate ? 25 : Math.min(Math.max(((displayValue - min) / (max - min)) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Color configurations
  const colorConfig = {
    blue: { stroke: '#3B82F6', gradient: ['#60A5FA', '#3B82F6'] },
    green: { stroke: '#10B981', gradient: ['#34D399', '#10B981'] },
    red: { stroke: '#EF4444', gradient: ['#F87171', '#EF4444'] },
    yellow: { stroke: '#F59E0B', gradient: ['#FBBF24', '#F59E0B'] },
    purple: { stroke: '#8B5CF6', gradient: ['#A78BFA', '#8B5CF6'] },
    gray: { stroke: '#6B7280', gradient: ['#9CA3AF', '#6B7280'] }
  };

  const backgroundColors = {
    gray: '#E5E7EB'
  };

  const getCurrentColor = () => {
    if (error) return colorConfig.red;
    if (success) return colorConfig.green;
    return colorConfig[color] || colorConfig.blue;
  };

  const currentColor = getCurrentColor();
  const bgColor = backgroundColors[backgroundColor] || backgroundColors.gray;

  const getFormattedValue = () => {
    if (formatValue) {
      return formatValue(displayValue, max, min);
    }
    return `${Math.round(percentage)}%`;
  };

  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      {/* Label */}
      {showLabel && label && (
        <div className={`mb-2 text-center ${labelClassName}`}>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {label}
          </span>
        </div>
      )}

      {/* Circular Progress */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className={`transform ${direction === 'counterclockwise' ? 'scale-x-[-1]' : ''} ${disabled ? 'opacity-50' : ''}`}
          style={{ transform: `rotate(${startAngle}deg)` }}
        >
          {/* Gradient Definition */}
          {gradient && (
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={currentColor.gradient[0]} />
                <stop offset="100%" stopColor={currentColor.gradient[1]} />
              </linearGradient>
            </defs>
          )}

          {/* Background Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={bgColor}
            strokeWidth={strokeWidth}
            strokeLinecap={lineCap}
          />

          {/* Progress Circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={gradient ? `url(#${gradientId})` : currentColor.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap={lineCap}
            strokeDasharray={strokeDasharray}
            initial={animated ? { strokeDashoffset: circumference } : false}
            animate={{ 
              strokeDashoffset: indeterminate ? circumference * 0.75 : strokeDashoffset,
              rotate: indeterminate ? 360 : 0
            }}
            transition={{
              strokeDashoffset: { duration: animated ? 0.5 : 0, ease: 'easeOut' },
              rotate: indeterminate ? { duration: 2, repeat: Infinity, ease: 'linear' } : { duration: 0 }
            }}
            className="origin-center"
          />
        </svg>

        {/* Center Content */}
        {showValue && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold text-gray-900 dark:text-white ${valueClassName}`}>
              {getFormattedValue()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// Multi-step Progress Component
export const StepProgress = ({
  steps = [],
  currentStep = 0,
  variant = 'default', // 'default' | 'minimal' | 'numbered'
  orientation = 'horizontal', // 'horizontal' | 'vertical'
  size = 'medium',
  color = 'blue',
  showLabels = true,
  showConnector = true,
  className = '',
  stepClassName = '',
  labelClassName = '',
  connectorClassName = '',
  clickable = false,
  onStepClick = null
}) => {
  const colorConfig = {
    blue: {
      active: 'bg-blue-500 border-blue-500 text-white',
      completed: 'bg-blue-500 border-blue-500 text-white',
      pending: 'bg-white border-gray-300 text-gray-500',
      connector: 'bg-blue-500'
    },
    green: {
      active: 'bg-green-500 border-green-500 text-white',
      completed: 'bg-green-500 border-green-500 text-white',
      pending: 'bg-white border-gray-300 text-gray-500',
      connector: 'bg-green-500'
    }
  };

  const sizeConfig = {
    small: { step: 'w-6 h-6 text-xs', label: 'text-xs' },
    medium: { step: 'w-8 h-8 text-sm', label: 'text-sm' },
    large: { step: 'w-10 h-10 text-base', label: 'text-base' }
  };

  const currentColor = colorConfig[color] || colorConfig.blue;
  const currentSize = sizeConfig[size] || sizeConfig.medium;

  const getStepStatus = (index) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'pending';
  };

  const getStepClasses = (index) => {
    const status = getStepStatus(index);
    const baseClasses = `
      ${currentSize.step}
      rounded-full border-2 flex items-center justify-center font-medium
      transition-all duration-200
      ${clickable ? 'cursor-pointer hover:scale-105' : ''}
      ${stepClassName}
    `;
    
    return `${baseClasses} ${currentColor[status]}`;
  };

  const handleStepClick = (index) => {
    if (clickable && onStepClick) {
      onStepClick(index);
    }
  };

  return (
    <div className={`${orientation === 'horizontal' ? 'flex items-center' : 'flex flex-col'} ${className}`}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {/* Step */}
          <div className={`${orientation === 'vertical' ? 'flex items-center' : 'flex flex-col items-center'}`}>
            <motion.div
              whileHover={clickable ? { scale: 1.05 } : {}}
              whileTap={clickable ? { scale: 0.95 } : {}}
              className={getStepClasses(index)}
              onClick={() => handleStepClick(index)}
            >
              {variant === 'numbered' ? (
                index + 1
              ) : getStepStatus(index) === 'completed' ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </motion.div>
            
            {/* Label */}
            {showLabels && (
              <div className={`${orientation === 'horizontal' ? 'mt-2 text-center' : 'ml-3'} ${currentSize.label} ${labelClassName}`}>
                <div className="font-medium text-gray-900 dark:text-white">
                  {step.title || step.label || step}
                </div>
                {step.description && (
                  <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                    {step.description}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Connector */}
          {showConnector && index < steps.length - 1 && (
            <div className={`
              ${orientation === 'horizontal' ? 'flex-1 h-0.5 mx-4' : 'w-0.5 h-8 my-2 ml-4'}
              ${index < currentStep ? currentColor.connector : 'bg-gray-300'}
              transition-colors duration-200
              ${connectorClassName}
            `} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBar;