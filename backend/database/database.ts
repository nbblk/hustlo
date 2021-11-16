import mongoose from "mongoose";
import * as dotenv from "dotenv";

let database: mongoose.Connection;

dotenv.config({ path: "./.env" });

const uri = process.env.MONGO_URI!;

export const connect = () => {

if (database) {
    return;
}
mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

database = mongoose.connection;

database.once("open", async () => {
    console.log("Connected to database");
});

database.on("error", () => {
    console.log("Error connecting to database");
})
};

export const disconnect = () => {
    if (!database) {
        return;
    }

    mongoose.disconnect();
};