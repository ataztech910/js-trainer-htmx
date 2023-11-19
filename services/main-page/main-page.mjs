function MainPageService (res, query) {
    const { module, view, task } = query;
    
    res.render('main-page', { layout: false });
}

export { MainPageService as service };