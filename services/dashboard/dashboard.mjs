function DashboardService (res, query) {
    const { module, view, task } = query;
    
    res.render(module, { layout: false });
}

export { DashboardService as service };