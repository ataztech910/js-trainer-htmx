import { createClient } from '@supabase/supabase-js';

async function AuthPostService (res, query, body) {
    const { email, password } = body;

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
   
    const { data, error } = await supabase.auth.signInWithPassword({email,password,});
    if (!error) {
        res.cookie('AuthToken', data.session.access_token, { maxAge: 900000, httpOnly: true });
        res.cookie('RefreshToken',data.session.refresh_token, { maxAge: 900000, httpOnly: true });
        res.setHeader('HX-Redirect', '/services/?module=dashboard');
    }
    res.send(data);
}

export { AuthPostService as service };