function IntegrationService (res, viewType, viewName) {
    res.render(viewName, { layout: false, viewType });
}

export { IntegrationService as service };