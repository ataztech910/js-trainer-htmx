/**
 * This is a normalisation function made to reduce amount of data that comes from Algolia
 * @param { AlgoliaSearchResult } data 
 * @returns Normalized data
 */
function normalizeData(data) {
    return {
        url: data.pathPDP,
        title: data.titleShort,
        titleShort: data.titleShort,
        sku: data.objectID,
        manufacturerName: data.manufacturerName,
        marketingAttribute: data.marketingAttribute,
        keyFacts: data.keyFacts,
        energyBadge: data.keyFacts[0],
        img: data.assets.find((asset) => asset.purpose === 'MAIN'),
        averageOverallRating: data.averageOverallRating,
        retailPriceGross_AT: data.retailPriceGross_AT, // only for the shop type
        retailPriceGross_DE: data.retailPriceGross_DE,
        retailPriceNet_AT: data.retailPriceNet_AT,
        retailPriceNet_DE: data.retailPriceNet_DE,
        storeAvailability: data.storeAvailability,
        stock: data.stock
    }
};

export { normalizeData };