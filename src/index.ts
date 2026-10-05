import getOffersCron from "@/cron/getOffersCron";

(async ()=> {
    await getOffersCron.trigger();
    process.exit();
})();
