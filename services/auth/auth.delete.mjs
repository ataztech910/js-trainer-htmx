import { createClient } from '@supabase/supabase-js';

async function AuthDeleteService (res, query, body) {

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
   
    const { error } = await supabase.auth.signOut();
    if (error) {
        res.send(error);
    } else {
        res.setHeader('HX-Redirect', '/auth?single=full');
        res.clearCookie("AuthToken");
        res.clearCookie("RefreshToken");
        res.send('OK');
    }
 
    
}

export { AuthDeleteService as service };