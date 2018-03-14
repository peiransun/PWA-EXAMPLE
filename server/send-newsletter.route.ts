import { USER_SUBSCRIPTIONS } from "./in-memory-db";
import * as webpush from "web-push";


export async function sendNewsletter(req, res) {
  
  console.log("Total subscriptions", USER_SUBSCRIPTIONS.length);

  // sample notification payload
  const notificationPayload = {
    notification: {
      title: "Angular 新里程碑，讚!!",
      body: "大家好， 大家一起邁向新的里程碑，GOGOGO",
      icon: "assets/main-page-logo-small-hat.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: "explore",
          title: "Go to the site"
        }
      ]
    }
  };

  try {
    await Promise.all(
      USER_SUBSCRIPTIONS.map(sub =>
        webpush.sendNotification(sub, JSON.stringify(notificationPayload))
      )
    );

    res.status(200).json({ message: "Newsletter sent successfully." });
  } catch (error) {
    console.error("Error sending notification, reason: ", error);
    res.sendStatus(500);
  }
}
