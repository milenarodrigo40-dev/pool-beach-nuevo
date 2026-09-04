const SUPABASE_URL = "https://nmpakeovqkdajtswjpgm.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_FyuFdiW_2eXNScLd9MShng_rLxxztsu";

if (!window.supabase) {
  console.error("No se cargó la librería de Supabase.");
} else {
  window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );
}