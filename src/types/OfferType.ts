enum OfferType {
    CURRENT = "promotionalOffers",
    UPCOMING = "upcomingPromotionalOffers"
}

const isOfferType = (value: any): value is OfferType => {
    return Object.values(OfferType).includes(value);
};

export {
    OfferType,
    isOfferType
};
