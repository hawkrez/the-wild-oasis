import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4cmlmZG9jY2tta3RwZXlocXd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQyNjA4NzksImV4cCI6MjAxOTgzNjg3OX0.8FF63uUeVslc_LLk1XfTRwGoc7yvHyvQngStuV0j3xk";
const SUPABASE_URL = "https://axrifdocckmktpeyhqwt.supabase.co";
const supabaseUrl = "https://axrifdocckmktpeyhqwt.supabase.co";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export default supabase;
export { SUPABASE_URL, supabaseUrl };
