import {OfferType} from "@/types/OfferType";
import FreeGame from "@/types/FreeGame";

class EpicGames {

    constructor() {

    }

    static async getFreeGames(): Promise<FreeGame[] | null> {

        try {

            const url = new URL(process.env.EPIC_GAMES_FREE_GAMES_URL!);

            url.searchParams.set("locale", "en-US");
            url.searchParams.set("country", "US");
            url.searchParams.set("allowCountries", "US");

            const res = await fetch( url.toString(), { signal: AbortSignal.timeout(10000) } );

            if(!res.ok){
                console.error("Failed to fetch free games");
                return null;
            }

            const json = await res.json();
            const elements: any[] = json.data.Catalog.searchStore.elements;

            return this.pickOffers(OfferType.CURRENT, elements);

        }catch (err: any){
            console.error(err);
            return null;
        }

    }

    static pickOffers = (key: OfferType, elements: any[]): FreeGame[] => {

        return elements.flatMap((el) => {

            const offers = (el.promotions?.[key] ?? []).flatMap((g: any) => g.promotionalOffers);
            const free = offers.find((o: any) => o.discountSetting?.discountPercentage === 0);

            if (!free) return [];

            const slug = el.offerMappings?.[0]?.pageSlug ?? el.catalogNs?.mappings?.[0]?.pageSlug ?? el.productSlug;
            return [{
                id: el.id,
                title: el.title,
                description: el.description,
                url: `https://store.epicgames.com/en-US/p/${slug}`,
                image: el.keyImages?.find((i: any) => i.type === "OfferImageWide")?.url,
                start: new Date(free.startDate),
                end: new Date(free.endDate),
            }];

        });

    }




}

export default EpicGames;
