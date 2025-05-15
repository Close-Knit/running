// check-tables.js
import { createClient } from '@supabase/supabase-js';

// Supabase credentials
const supabaseUrl = 'https://lfcbwmqvbgfpgpjkqwue.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmY2J3bXF2YmdmcGdwamtxd3VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU0NTM5NzcsImV4cCI6MjAzMTAyOTk3N30.Nh8yCZtYJMDM0T4Yx0b0-Uh9bTj-LrYl9pEcCw5icQE';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  console.log('Checking available tables...');
  
  try {
    // List all tables in the database
    const { data, error } = await supabase
      .rpc('list_tables');
    
    if (error) {
      console.error('Error listing tables:', error);
      return;
    }
    
    console.log('Available tables:', data);
    
    // Check if events_canada table exists
    const hasEventsCanada = data.some(table => table === 'events_canada');
    console.log('events_canada table exists:', hasEventsCanada);
    
    // Check if events table exists
    const hasEvents = data.some(table => table === 'events');
    console.log('events table exists:', hasEvents);
  } catch (err) {
    console.error('Error checking tables:', err);
  }
}

// Run the check
checkTables();
