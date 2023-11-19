import { createClient } from '@supabase/supabase-js';

async function AuthPostService (res, query, body) {
    const { email, password } = body;

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    console.log('on call', { email, password } );
    // const { data, error } = await supabase.auth.signUp({email,password,});
    const { data, error } = await supabase.auth.signInWithPassword({email,password,});

    res.send(data);
}

export { AuthPostService as service };