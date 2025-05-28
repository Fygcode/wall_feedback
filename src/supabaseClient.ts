// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';


// Log the environment variables to check if they're loaded correctly
console.log('SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL || 'URL not set');
console.log('SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY || 'Key not set');

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
