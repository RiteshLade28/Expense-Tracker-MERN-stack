import { Express } from "express";
import mongoose from "mongoose";
import cors from 'cors';

const app = Express();
const PORT = 4000;
const CONNECTION_URL = "mongodb://RiteshLade:1XBDHjFP2qfTJizB@ac-3ffyfir-shard-00-00.cqsmpth.mongodb.net:27017,ac-3ffyfir-shard-00-01.cqsmpth.mongodb.net:27017,ac-3ffyfir-shard-00-02.cqsmpth.mongodb.net:27017/?ssl=true&replicaSet=atlas-nculeh-shard-0&authSource=admin&retryWrites=true&w=majority";

app.use(bodyParser.json({limit: "20mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "20mb", extended: true}));
app.use(cors());
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
}).catch((err) => console.log(err));