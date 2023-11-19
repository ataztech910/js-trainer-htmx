function executeService(config) {
    try {
        import(config.servicePath).then((module) => {
            module.service(config.res, config.query, config.body, config.module);
        });
    } catch(error) {
        console.error('No such module');
    }
}

function renderService(app, module, res, query, root) {
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