import * as express from "express";
import { Application } from "express";
import { readAllLessons } from "./read-all-lessons.route";
import { addPushSubscriber } from "./add-push-subscriber.route";
import { sendNewsletter } from "./send-newsletter.route";
import * as webpush from "web-push";


const bodyParser = require("body-parser");

const vapidKeys = {
    publicKey: "BGeC526YRDhbebG6sGxrCnPBSfxT9wfSHsRViviiZBHjECQkz7D8Tm6h2RH7Hk3SO_ZfyvTraw0HpCckYa4NcJ0",
    privateKey: "abA5l6Z8D51xHjW5xbJkQmaUOPnz0CZLTXuNqbhKLW8"
};

webpush.setVapidDetails(
    "mailto:peiran.sun@gmail.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const app: Application = express();

app.use(bodyParser.json());

// REST API
app.route("/api/lessons").get(readAllLessons);

app.route("/api/notifications").post(addPushSubscriber);

app.route("/api/newsletter").post(sendNewsletter);

// launch an HTTP Server
const httpServer = app.listen(9000, () => {
    console.log(
        "HTTP Server running at http://localhost:" + httpServer.address().port
    );
});
