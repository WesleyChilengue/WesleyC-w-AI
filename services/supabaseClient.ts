import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://csdjwbsazclaghkrohom.supabase.co';
const supabaseKey = 'sb_publishable_mnCWZXivc9aMyNd6my0sZg_jChR6fBv';

export const supabase = createClient(supabaseUrl, supabaseKey);