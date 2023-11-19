function executeService(config) {
    try {
        console.log(config);
        import(config.servicePath).then((module) => {
            module.service(config.res, config.query, config.body, config.module);
        });
    } catch(error) {
        console.error('No such module');
    }
}

function renderService(app, module, res, query, root) {
    console.log('PATH', root + `/services/${module}`);
    app.set('views', root + `/services/${module}`);
    executeService({
      method: 'get',
      servicePath: `../../services/${module}/${module}.mjs`,
      res,
      query: query,
      module
    });
}

export { renderService, executeService };