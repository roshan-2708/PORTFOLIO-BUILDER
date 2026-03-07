require('dotenv').config();
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
// Use Service Role Key for Backend Admin Actions
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 

if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase Environment Variables!");
}

// Client with Admin Privileges
const supabase = createClient(supabaseUrl, supabaseServiceKey); 

module.exports = supabase;