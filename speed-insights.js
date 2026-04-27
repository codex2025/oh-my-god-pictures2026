// Vercel Speed Insights initialization
// This script loads and initializes Vercel Speed Insights for performance monitoring

(function() {
  // Initialize the queue for Speed Insights
  if (window.si) return;
  
  window.si = function(...params) {
    window.siq = window.siq || [];
    window.siq.push(params);
  };

  // Create and inject the Speed Insights script
  const script = document.createElement('script');
  
  // Use the Vercel-hosted script (available when deployed on Vercel)
  // or the debug version for development
  const isDevelopment = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1';
  
  script.src = isDevelopment 
    ? 'https://va.vercel-scripts.com/v1/speed-insights/script.debug.js'
    : '/_vercel/speed-insights/script.js';
  
  script.defer = true;
  
  // Add SDK metadata
  script.dataset.sdkn = '@vercel/speed-insights';
  script.dataset.sdkv = '2.0.0';
  
  // Error handling
  script.onerror = function() {
    console.log('[Vercel Speed Insights] Failed to load script. Please check if any content blockers are enabled and try again.');
  };
  
  // Inject the script
  document.head.appendChild(script);
})();
