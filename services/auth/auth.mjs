// import { createClient } from '@supabase/supabase-js';

async function AuthService (res, query, _, module) {
    const { single } = query;
    const layout = single === 'false' ? JSON.parse(single) : single;
    res.render(module, { layout });
}

export { AuthService as service };