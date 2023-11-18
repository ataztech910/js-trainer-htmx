import { createClient } from '@supabase/supabase-js';

async function AuthService (res, query) {
    const { module, view, task } = query;

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    
    // const { data, error } = await supabase.auth.signUp({
    //     email: 'example@email.com',
    //     password: 'example-password',
    // });

    res.render(module, { layout: false });
}

export { AuthService as service };