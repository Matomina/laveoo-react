import { createClient } from "@supabase/supabase-js";

// Valeurs de secours pour éviter de faire planter tout le site si les
// variables d'environnement ne sont pas encore configurées sur l'hébergeur
// (les fonctionnalités liées à Supabase échoueront simplement, sans casser
// le reste du site).
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-key";

export const supabase = createClient(supabaseUrl, supabaseKey);
