import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

declare var cordova: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private firebase: FirebaseX,
    private localNotifications: LocalNotifications
  ) {
    this.initializeApp();
  }

  initializeApp() {
    document.addEventListener('deviceready', () => {
      this.platform.ready().then(() => {
        // Ask for notification permissions
        this.askForNotificationPermissions();

        // Get and log the current FCM token

        this.firebase.onMessageReceived().subscribe((data) => {
          // Handle incoming push notifications
          console.log('Schedule Push Notification');
          this.localNotifications.schedule({
            text: data.body,
            title: data.title,
            foreground: true,

            // Add more properties as needed
          });
          // cordova.plugins.notification.local.schedule({
          //   title: data.title,
          //   text: data.text,
          // });
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
          // You can handle additional logic here if needed
        })
        .catch((error) => {
          console.error('Error granting push notifications permission', error);
          // Handle the case where the user denied permission
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
}
