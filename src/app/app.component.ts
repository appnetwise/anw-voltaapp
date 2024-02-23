import { Component, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NotificationService } from './service/notification-service.service';
import { FirebaseService } from './service/firebase-service.service';
import { Notification } from './types/data/notification';
import { APP_DEVICE_READY } from './constants/app/platform';
import { PlatformType } from './types/app/platform';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  badgeValue: number = 0;
  showNotificationDetails: boolean = false;
  selectedNotification: Notification | null = null;

  constructor(
    private platform: Platform,
    private firebase: FirebaseX,
    private localNotifications: LocalNotifications,
    private notificationService: NotificationService,
    private firebaseService: FirebaseService,
    private ngZone: NgZone
  ) {
    this.initializeApp();
  }

  initializeApp() {
    document.addEventListener(APP_DEVICE_READY, () => {
      this.platform.ready().then(() => {
        // Ask for notification permissions
        this.firebaseService.askForNotificationPermissions();
        // Subscribe all users
        this.subscribeAll();

        this.firebase.onMessageReceived().subscribe((data) => {
          this.ngZone.run(() => {
            // Handle incoming push notifications
            console.log('Schedule push notification');
            this.localNotifications.schedule({
              text: data.body,
              title: data.title,
              foreground: true,
            });

            // Update badge value
            this.badgeValue++;

            // Store notification details
            this.selectedNotification = {
              title: data?.title,
              text: data?.body,
            };
          });
        });

        // Listen for token refresh events
        this.firebaseService.onTokenRefresh();
      });
    });
  }

  async subscribeAll() {
    if (this.platform.is(PlatformType.Cordova)) {
      try {
        const token = await this.firebaseService.onTokenRefresh();

        if (token) {
          console.log('Sending notification', token);
          await this.notificationService
            .subscribeTokenToServer(token)
            .toPromise();
          console.log('Subscribe all token posted successfully');
        } else {
          console.error('Token is null');
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error during subscription:', error.message);
        } else {
          console.error('Unknown error during subscription:', error);
        }
      }
    }
  }
  showNotifications() {
    this.ngZone.run(() => {
      this.showNotificationDetails = !this.showNotificationDetails;
    });
  }
}
