import { Component, OnInit } from "@angular/core";
import { LessonsService } from "../services/lessons.service";
import { Observable } from "rxjs/Observable";
import { Lesson } from "../model/lesson";
import { SwPush } from "@angular/service-worker";
import { NewsletterService } from "../services/newsletter.service";

@Component({
  selector: "lessons",
  templateUrl: "./lessons.component.html",
  styleUrls: ["./lessons.component.css"]
})
export class LessonsComponent implements OnInit {
  lessons$: Observable<Lesson[]>;
  isLoggedIn$: Observable<boolean>;

  subscription: PushSubscription;

  readonly VAPID_PUBLIC_KEY = "BGeC526YRDhbebG6sGxrCnPBSfxT9wfSHsRViviiZBHjECQkz7D8Tm6h2RH7Hk3SO_ZfyvTraw0HpCckYa4NcJ0";

  constructor(
    private lessonsService: LessonsService,
    private swPush: SwPush,
    private newsletterService: NewsletterService
  ) {}

  public ngOnInit() {
    this.loadLessons();
  }

  public loadLessons() {
    this.lessons$ = this.lessonsService
      .loadAllLessons()
      .catch(err => Observable.of([]));
  }

  public async subscribeToNotifications() {
    try {
      this.subscription = await this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      });

      this.addPushSubscriber(this.subscription);
      console.log("Notification Subscription: ", this.subscription);
    } catch (error) {
      console.error("Could not subscribe to notifications", error);
    }
  }

  private async addPushSubscriber(subscription: PushSubscription) {

    try {
      await this.newsletterService.addPushSubscriber(subscription).subscribe();
      console.log("Sent push subscription to server.");
    } catch (error) {
      console.log("Could not send subscription to server, reason: ", error);
    }
  }

  public sendNewsletter() {
    console.log("Sending Newsletter to all Subscribers ...");

    this.newsletterService.send().subscribe();
  }
}
