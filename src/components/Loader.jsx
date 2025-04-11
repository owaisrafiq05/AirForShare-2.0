import PropTypes from 'prop-types';

const Loader = ({ type = 'spinner', size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return (
          <div className="flex space-x-2 justify-center items-center">
            {[1, 2, 3].map((dot) => (
              <div 
                key={dot} 
                className={`${sizes[size].split(' ')[0].replace('w-', 'w-').replace('12', '3').replace('16', '4').replace('6', '2')} bg-blue-600 rounded-full animate-bounce`}
                style={{ animationDelay: `${(dot - 1) * 0.15}s` }}
              ></div>
            ))}
          </div>
        );
        
      case 'pulse':
        return (
          <div className={`${sizes[size]} bg-blue-600 rounded-full animate-pulse-slow`}></div>
        );
        
      case 'progress':
        return (
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 animate-gradient-x loading-bar"></div>
          </div>
        );
        
      case 'skeleton':
        return (
          <div className="space-y-3 w-full">
            <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 bg-gray-200 rounded animate-pulse w-11/12"></div>
            <div className="h-5 bg-gray-200 rounded animate-pulse w-9/12"></div>
          </div>
        );
        
      case 'spinner':
      default:
        return <span className={`loader ${size === 'sm' ? 'border-4 !w-8 !h-8' : size === 'lg' ? 'border-8' : ''}`}></span>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      {renderLoader()}
      {text && <p className="text-gray-600 dark:text-gray-400 font-medium">{text}</p>}
    </div>
  );
};

Loader.propTypes = {
  type: PropTypes.oneOf(['spinner', 'dots', 'pulse', 'progress', 'skeleton']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  text: PropTypes.string
};

export default Loader; 