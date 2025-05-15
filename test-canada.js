// test-canada.js
import { createClient } from '@supabase/supabase-js';

// Supabase credentials
const supabaseUrl = 'https://lfcbwmqvbgfpgpjkqwue.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmY2J3bXF2YmdmcGdwamtxd3VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU0NTM5NzcsImV4cCI6MjAzMTAyOTk3N30.Nh8yCZtYJMDM0T4Yx0b0-Uh9bTj-LrYl9pEcCw5icQE';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

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

// Run the test
testCanadaEvents();
