// src/test-canada-events.js
import { supabase } from './supabaseClient';

// Function to test querying the events_canada table
async function testCanadaEvents() {
  console.log('Testing events_canada table...');

  try {
    // Test querying the events_canada table
    const { data: canadaEvents, error: canadaError } = await supabase
      .from('events_canada')
      .select('*')
      .limit(10);

    if (canadaError) {
      console.error('Error querying events_canada table:', canadaError);
      return;
    }

    console.log('Successfully queried events_canada table. Results:', canadaEvents);

    // Test querying the events table for comparison
    const { data: usaEvents, error: usaError } = await supabase
      .from('events')
      .select('*')
      .limit(10);

    if (usaError) {
      console.error('Error querying events table:', usaError);
      return;
    }

    console.log('Successfully queried events table. Results:', usaEvents);
  } catch (err) {
    console.error('Error in testCanadaEvents:', err);
  }
}

// Run the test function immediately
testCanadaEvents();

// Export the test function
export default testCanadaEvents;
