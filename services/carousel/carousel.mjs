import algoliasearch from 'algoliasearch';
import { normalizeData } from '../utils/normalize-data.mjs';

function CarouselService (res, viewType, viewName) {
    const client = algoliasearch(process.env.APPLICATION_ID, process.env.API_KEY);
    const index = client.initIndex(process.env.INDEX);
    let data= [];
    index.search('*', {hitsPerPage: 12}).then(({ hits }) => {
        hits.forEach(hit => {
            data.push(normalizeData(hit));
        });
        res.render(viewName, { layout: false, data, viewType });
    });
}

export { CarouselService as service };