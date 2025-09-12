// UI Components Export
export { default as LoadingSpinner, useLoadingState, LoadingProvider } from './LoadingSpinner';
export { default as ErrorBoundary, useErrorHandler, withErrorBoundary, AsyncErrorBoundary } from './ErrorBoundary';
export { default as Pagination, usePagination } from './Pagination';
export { default as InfiniteScroll, useInfiniteScroll, VirtualInfiniteScroll } from './InfiniteScroll';
export { default as Toast, ToastProvider, useToast, TOAST_TYPES, TOAST_POSITIONS } from './Toast';
export { default as ProgressBar, CircularProgress, StepProgress } from './ProgressBar';

// Re-export commonly used constants
export {
  TOAST_TYPES,
  TOAST_POSITIONS
} from './Toast';

// Utility functions for UI components
export const createLoadingWrapper = (Component, loadingProps = {}) => {
  return function LoadingWrapper(props) {
    const { loading, ...restProps } = props;
    
    if (loading) {
      return <LoadingSpinner {...loadingProps} />;
    }
    
    return <Component {...restProps} />;
  };
};

export const createErrorWrapper = (Component, errorBoundaryProps = {}) => {
  return function ErrorWrapper(props) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
};

// Combined wrapper for loading and error handling
export const createSafeComponent = (Component, options = {}) => {
  const { loadingProps = {}, errorBoundaryProps = {} } = options;
  
  return function SafeComponent(props) {
    const { loading, error, ...restProps } = props;
    
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        {loading ? (
          <LoadingSpinner {...loadingProps} />
        ) : (
          <Component {...restProps} />
        )}
      </ErrorBoundary>
    );
  };
};

// Hook for managing UI state
export const useUIState = (initialState = {}) => {
  const [state, setState] = React.useState({
    loading: false,
    error: null,
    success: false,
    data: null,
    ...initialState
  });

  const setLoading = (loading) => setState(prev => ({ ...prev, loading, error: null }));
  const setError = (error) => setState(prev => ({ ...prev, error, loading: false }));
  const setSuccess = (success, data = null) => setState(prev => ({ ...prev, success, data, loading: false, error: null }));
  const reset = () => setState({ loading: false, error: null, success: false, data: null, ...initialState });

  return {
    ...state,
    setLoading,
    setError,
    setSuccess,
    reset
  };
};

// Default export object with all components
const UIComponents = {
  LoadingSpinner,
  ErrorBoundary,
  Pagination,
  InfiniteScroll,
  Toast,
  ProgressBar,
  CircularProgress,
  StepProgress,
  ToastProvider,
  LoadingProvider,
  useToast,
  usePagination,
  useInfiniteScroll,
  useLoadingState,
  useErrorHandler,
  useUIState,
  createLoadingWrapper,
  createErrorWrapper,
  createSafeComponent,
  withErrorBoundary,
  AsyncErrorBoundary,
  VirtualInfiniteScroll,
  TOAST_TYPES,
  TOAST_POSITIONS
};

export default UIComponents;