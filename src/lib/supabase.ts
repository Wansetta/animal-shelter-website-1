import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://khdlunwonpzufqnadalq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoZGx1bndvbnB6dWZxbmFkYWxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMjA4ODUsImV4cCI6MjA2NDU5Njg4NX0.49GIgmzVIhrt8rVtQ1h5UdESenf_DRh7SzJ0H5lyF7M";

export const supabase = createClient(supabaseUrl, supabaseKey);
