import { Cron } from 'croner';
import EpicGames from "@/services/EpicGames";
import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv";
import TelegramBot from "@/services/TelegramBot";
import FreeGame from "@/types/FreeGame";
dotenv.config();

const getOffersCron: Cron = new Cron('0 13 * * *', { paused: true }, async () => {

    try{

        const freeGames = await EpicGames.getFreeGames();

        if(!freeGames){
            console.log("Failed to fetch free games");
            return;
        }

        if(!freeGames.length){
            console.log("No free games found");
            return;
        }

        const db = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!);

        const { data, error } = await db
            .from('state')
            .select()
            .eq("key", "lastId")

        if (error) {
            console.error(error);
            return;
        }

        let newFreeGames: FreeGame[] = [];

        if (data.length > 0) {

            const lastKnownIndex = freeGames.findIndex((g) => g.id === data[0].value);

            if (lastKnownIndex !== -1) {
                newFreeGames = freeGames.slice(lastKnownIndex + 1);
            }else{
                newFreeGames = freeGames;
            }

        }else{
            newFreeGames = freeGames;
        }

        if (newFreeGames.length > 0) {

            for(const game of newFreeGames){
                await TelegramBot.announceFreeGame(game);
            }

            const { error: updateError } = await db
                .from('state')
                .upsert(
                    { key: "lastId", value: newFreeGames[newFreeGames.length - 1].id },
                    { onConflict: "key" }
                );

            if (updateError) {
                throw updateError;
            }

        }

    }catch (err: any){
        console.error(err);
        process.exitCode = 1;
    }

});


export default getOffersCron;