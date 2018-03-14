import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class NewsletterService {
  constructor(private http: HttpClient) {}

  public addPushSubscriber(sub: any) {
    return this.http.post("/api/notifications", sub);
  }

  public send() {
    return this.http.post("/api/newsletter", null);
  }
}
