import { Component, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  badgeValue: number = 0;
  showNotificationDetails: boolean = false;
  selectedNotification: any;

  constructor(
    private platform: Platform,
    private firebase: FirebaseX,
    private localNotifications: LocalNotifications,
    private http: HttpClient,
    private ngZone: NgZone
  ) {
    this.initializeApp();
  }

  initializeApp() {
    document.addEventListener('deviceready', () => {
      this.platform.ready().then(() => {
        // Ask for notification permissions
        this.askForNotificationPermissions();

        // Get and log the current FCM token

        // Subscribe all users
        this.subscribeAll();

        this.firebase.onMessageReceived().subscribe((data) => {
          this.ngZone.run(() => {
            // Handle incoming push notifications
            console.log('Schedule Push Notification');
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
        this.onTokenRefresh();
      });
    });
  }

  askForNotificationPermissions() {
    if (this.platform.is('cordova')) {
      this.firebase
        .grantPermission()
        .then(() => {
          console.log('Push notifications permission granted');
        })
        .catch((error) => {
          console.error('Error granting push notifications permission', error);
        });
    }
  }

  onTokenRefresh() {
    if (this.platform.is('cordova')) {
      this.firebase.onTokenRefresh().subscribe((token) => {
        console.log('Refreshed FCM Token:', token);
      });
    }
  }

  postTokenToApi(token: string) {
    if (token) {
      const apiEndpoint =
        'https://4911-2405-201-c04a-70c3-907b-e8c9-400-162b.ngrok-free.app/subscribe-all';

      const formData = new FormData();
      formData.append('token', token);

      this.http.post(apiEndpoint, formData).subscribe(
        (response) => {
          console.log('Subscribe all token posted successfully:', response);
        },
        (error: Error) => {
          console.error(
            'Error posting subscribe all token to API:',
            error.message
          );
        }
      );
    } else {
      console.error('FCM Token is null');
    }
  }

  subscribeAll() {
    if (this.platform.is('cordova')) {
      this.firebase
        .getToken()
        .then((token) => {
          if (token) {
            console.log('Sending notification for FCM Token:', token);
            this.postTokenToApi(token);
          } else {
            console.error('FCM Token is null');
          }
        })
        .catch((error) => {
          console.error('Error getting FCM token', error);
        });
    }
  }

  showNotifications() {
    // Toggle the display of notification details
    this.ngZone.run(() => {
      this.showNotificationDetails = !this.showNotificationDetails;
    });
  }
}
