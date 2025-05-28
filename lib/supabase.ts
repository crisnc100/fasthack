import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://dfvqegbhmuxatwadamom.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmdnFlZ2JobXV4YXR3YWRhbW9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTUyNzksImV4cCI6MjA2MTc5MTI3OX0.Inb5OHerxZj3JGAM6S0AWVzcEkk5Wrgb7p4ZRPlRwmM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});