import mongoose from "mongoose";
import appConfig from "./Config";

async function connect(): Promise<void> {
    try {
        console.log(appConfig.connectionString);

        const db = await mongoose.connect( appConfig.connectionString );
        console.log(`We're connected to ${db.connections[0].name} on MongoDB.`);
    }
    catch(err: any) {
        console.error(err);
    }
}

export default {
    connect
};