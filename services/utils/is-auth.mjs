import { createClient } from '@supabase/supabase-js';

const authPageUrl = '/auth?single=full';

async function isAuth(req, res, next) {
    console.log(req.cookies.AuthToken);
    if(!req.cookies.AuthToken) {
        var err = new Error('Not authorized! Go back!');
        err.status = 401;
        res.redirect(authPageUrl);
        next(err);
    }
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    let getUser = await supabase.auth.getUser(req.cookies.AuthToken);
    if (getUser.error) {
        if(req.cookies.RefreshToken) {
            getUser = await supabase.auth.refreshSession({ refresh_token: req.cookies.RefreshToken });
            console.log(getUser);
            if(getUser.error !== null) {
                res.redirect(authPageUrl);
                next(error);
            } else {
                res.cookie('AuthToken', getUser.data.session.access_token);
                res.cookie('RefreshToken', getUser.data.session.refresh_token);
                next();
            }
        }
    } else {      
        if (getUser.user === null) {     
            var err = new Error('Not authorized! Go back!');
            err.status = 401;
            res.redirect(authPageUrl);
            next(err);
        } else {
            res.cookie('AuthToken', req.cookies.AuthToken);
            res.cookie('RefreshToken', req.cookies.RefreshToken);
            next();
        }
    }
}

export { isAuth };