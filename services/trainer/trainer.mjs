function TrainerService (res, viewType, viewName) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    res.render(viewName, { layout: false, viewType });
}

export { TrainerService as service };