import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { PinnedRunState } from '../components/SimulationComparison';

// Initialize Supabase - reads from env vars (Vite exposes VITE_ prefixed vars)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Re-export the Supabase User type for use across components
export type { User as SupabaseUser } from '@supabase/supabase-js';

// Authentication helpers
export const ensureAuthenticated = async (): Promise<User | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) return user;
  try {
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) throw error;
    return data.user;
  } catch (err) {
    console.warn('Anonymous sign-in skipped (offline mode or rules fallback):', err);
    return null;
  }
};

// Google Auth helpers
export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    if (error) throw error;
    // OAuth redirects; after redirect, the session is available
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (err) {
    console.warn('Google sign-in prevented or canceled, falling back to authenticated credentials:', err);
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }
};

export const logOut = async (): Promise<void> => {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.warn('Sign-out error:', err);
  }
};

// Persist Pinned Run to Supabase
export const savePinnedRunToSupabase = async (pinnedRun: PinnedRunState) => {
  try {
    await ensureAuthenticated();
    const { error } = await supabase
      .from('pinned_runs')
      .upsert({
        id: pinnedRun.id,
        name: pinnedRun.name,
        timestamp: pinnedRun.timestamp,
        config: pinnedRun.config,
        actual_test_mae: pinnedRun.actualTestMAE,
        actual_test_rmse: pinnedRun.actualTestRMSE,
        saved_at: new Date().toISOString(),
      }, { onConflict: 'id' });
    if (error) throw error;
  } catch (error) {
    console.warn('Supabase write fallback (local storage remains active):', error);
  }
};

// Fetch historical pinned benchmarks from Supabase
export const fetchPinnedRunsFromSupabase = async (): Promise<Partial<PinnedRunState>[]> => {
  try {
    await ensureAuthenticated();
    const { data, error } = await supabase
      .from('pinned_runs')
      .select('*')
      .order('saved_at', { ascending: false })
      .limit(10);
    if (error) throw error;
    return (data || []).map((row: any) => ({
      id: row.id,
      name: row.name,
      timestamp: row.timestamp,
      config: row.config,
      actualTestMAE: row.actual_test_mae,
      actualTestRMSE: row.actual_test_rmse,
    }));
  } catch (error) {
    console.warn('Supabase read fallback:', error);
    return [];
  }
};

// Auth state listener helper (mirrors Firebase onAuthStateChanged pattern)
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });
  return () => subscription.unsubscribe();
};
