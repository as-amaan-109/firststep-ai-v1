export function generateRandomId(len) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < len || 16; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
  }
  
  export const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // This makes the scroll smooth
    });
  };
  export function formatObjectToText(obj) {
    let result = '';
  
    // Loop through the object properties
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        // If the value is an object, recursively format it
        result += `${key.charAt(0).toUpperCase() + key.slice(1)}:\n${formatObjectToText(value)}\n`;
      } else if (Array.isArray(value)) {
        // If the value is an array, format it accordingly
        result += `${key.charAt(0).toUpperCase() + key.slice(1)}:\n`;
        value.forEach((item, index) => {
          result += `  ${index + 1}. ${item}\n`;
        });
      } else {
        // For simple key-value pairs
        result += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`;
      }
    }
  
    return result;
  }