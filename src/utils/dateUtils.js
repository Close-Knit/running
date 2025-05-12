/**
 * Sorts events by date in ascending order (closest date first)
 * @param {Array} events - Array of event objects
 * @returns {Array} - Sorted array of events
 */
export const sortEventsByDate = (events) => {
  if (!events || !Array.isArray(events)) return [];
  
  return [...events].sort((a, b) => {
    // Skip events without dates
    if (!a.dates_season) return 1;
    if (!b.dates_season) return -1;
    
    try {
      // Extract dates from both events
      const aMatch = a.dates_season.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
      const bMatch = b.dates_season.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
      
      // If either doesn't match the pattern, handle accordingly
      if (!aMatch) return 1;
      if (!bMatch) return -1;
      
      // Create Date objects for comparison
      const aDate = new Date(
        parseInt(aMatch[1], 10),
        parseInt(aMatch[2], 10) - 1,
        parseInt(aMatch[3], 10)
      );
      
      const bDate = new Date(
        parseInt(bMatch[1], 10),
        parseInt(bMatch[2], 10) - 1,
        parseInt(bMatch[3], 10)
      );
      
      // Compare dates (ascending order)
      return aDate - bDate;
    } catch (err) {
      console.error('Error sorting dates:', err);
      return 0;
    }
  });
};

/**
 * Filters events to show only those in the next N days
 * @param {Array} events - Array of event objects
 * @param {Date} startDate - Start date for filtering
 * @param {number} days - Number of days to include
 * @returns {Array} - Filtered array of events
 */
export const filterEventsByDateRange = (events, startDate, days = 30) => {
  if (!events || !Array.isArray(events) || !startDate) return events;
  
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + days);
  
  return events.filter(event => {
    const dateStr = event.dates_season;
    if (!dateStr) return false;
    
    try {
      const dateMatch = dateStr.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
      if (dateMatch) {
        const [_, year, month, day] = dateMatch.map(n => parseInt(n, 10));
        const eventDate = new Date(year, month - 1, day);
        
        return eventDate >= startDate && eventDate <= endDate;
      }
      return false;
    } catch (err) {
      console.error('Error filtering dates:', err);
      return false;
    }
  });
};
