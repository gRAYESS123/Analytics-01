// Email data validation
export const validateEmailData = (data) => {
    const errors = [];
    
    // Check if data is an array
    if (!Array.isArray(data)) {
      errors.push('Invalid data format: expected an array');
      return { isValid: false, errors };
    }
  
    // Check if data is empty
    if (data.length === 0) {
      errors.push('No data found in the file');
      return { isValid: false, errors };
    }
  
    // Required fields
    const requiredFields = ['sender', 'subject', 'date', 'body'];
    
    // Validate each row
    data.forEach((row, index) => {
      // Check required fields
      requiredFields.forEach(field => {
        if (!row[field]) {
          errors.push(`Row ${index + 1}: Missing required field '${field}'`);
        }
      });
  
      // Validate date format
      if (row.date && new Date(row.date).toString() === 'Invalid Date') {
        errors.push(`Row ${index + 1}: Invalid date format`);
      }
  
      // Validate email format (basic)
      if (row.sender && !isValidEmail(row.sender)) {
        errors.push(`Row ${index + 1}: Invalid email format for sender`);
      }
    });
  
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  // Email format validation
  export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Date range validation
  export const validateDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return true;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) {
      return false;
    }
    
    // Optional: Check if date range is within reasonable bounds
    const maxRangeInDays = 365; // 1 year
    const daysDifference = (end - start) / (1000 * 60 * 60 * 24);
    
    return daysDifference <= maxRangeInDays;
  };
  
  // CSV format validation
  export const validateCSVHeaders = (headers) => {
    const requiredHeaders = ['sender', 'subject', 'date', 'body'];
    const missingHeaders = requiredHeaders.filter(
      required => !headers.includes(required)
    );
    
    return {
      isValid: missingHeaders.length === 0,
      missingHeaders
    };
  };