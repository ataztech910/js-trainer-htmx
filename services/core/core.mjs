function ServiceInit(config) {
    try {
        import(config.servicePath).then((module) => {
            module.service(config.res, config.query, config.body);
        });
        } catch(error) {
            console.error('No such module');
        }
}

export { ServiceInit };