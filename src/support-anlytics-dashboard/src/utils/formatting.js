// Date formatting utilities
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Time duration formatting
  export const formatDuration = (hours) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)}m`;
    }
    if (hours < 24) {
      return `${Math.round(hours)}h`;
    }
    return `${Math.round(hours / 24)}d`;
  };
  
  // Number formatting
  export const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };
  
  // Percentage formatting
  export const formatPercentage = (value) => {
    return `${Number(value).toFixed(1)}%`;
  };
  
  // Text truncation
  export const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
  
  // Email content sanitization
  export const sanitizeEmailContent = (content) => {
    // Remove HTML tags
    const noHtml = content.replace(/<[^>]*>/g, '');
    
    // Remove excessive whitespace
    const trimmed = noHtml.replace(/\s+/g, ' ').trim();
    
    // Remove email signatures (simple implementation)
    const noSignature = trimmed.split(/--+|__+|Best regards|Sincerely/i)[0];
    
    return noSignature.trim();
  };