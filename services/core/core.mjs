function ServiceInit(config) {
    try {
        import(config.servicePath).then((module) => {
            // if(config.method === 'get') {
            //     app.use('/public', config.publicPath);
            //     app.set('views', config.viewsPath);
            // }
            module.service(config.res, config.query);
        });
        } catch(error) {
            console.error('No such module');
        }
}

export { ServiceInit };