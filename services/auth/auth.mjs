import { createClient } from '@supabase/supabase-js';

async function AuthService (res, query) {
    const { module, single } = query;
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    
    const layout = single === 'false' ? JSON.parse(single) : single;
    const { data, error } = await supabase.auth.getUser('eyJhbGciOiJIUzI1NiIsImtpZCI6Ii85YVdZWGc4T1RPZzJsMVUiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzAwMzU3MTE2LCJpYXQiOjE3MDAzNTM1MTYsImlzcyI6Imh0dHBzOi8vY2ZpcGttbHNwa2hoaXF3b212dG8uc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjE0NjM0Yzk1LTJiMDktNDUxMC04Njk4LWFmNmMwNGUyYmY1YSIsImVtYWlsIjoidGVzdEB0ZXN0LnNzIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6e30sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3MDAzNTM1MTZ9XSwic2Vzc2lvbl9pZCI6IjFjMzVlMTgzLTgzZDItNGI3OS1hN2MxLTE3ODNhYzA1N2M5YyJ9.OlUM3DkRZFq7rO-ViA5wWx7hsTVuHKdi1ZTS-DmDOvU');
    console.log({ data, error });
    res.render(module, { layout });
}

export { AuthService as service };