import { createClient  } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URI
const supabaseApiKey= import.meta.env.VITE_SUPABASE_API_KEY

const supabase = createClient(supabaseUrl, supabaseApiKey)

export default supabase