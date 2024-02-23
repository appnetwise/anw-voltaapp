import { Component } from '@angular/core';
import { NotificationService } from '../service/notification-service.service';
import { FirebaseService } from '../service/firebase-service.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private notificationService: NotificationService,
    private firebaseService: FirebaseService
  ) {}

  async bookARide() {
    try {
      const token = await this.firebaseService.onTokenRefresh();
      if (token) {
        console.log('Sending notification for book a ride', token);
        this.notificationService.sendMessageToServer(token).subscribe(
          (response) => {
            console.log('Token posted successfully:', response);
          },
          (error: Error) => {
            console.error('Error posting token to API:', error.message);
          }
        );
      } else {
        console.error('Token is null');
      }
    } catch (error) {
      console.error('Error obtaining FCM token', error);
    }
  }
}
