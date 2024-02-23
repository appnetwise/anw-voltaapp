import { Injectable } from '@angular/core';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Platform } from '@ionic/angular';
import { PlatformType } from '../types/app/platform';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firebase: FirebaseX, private platform: Platform) {}

  askForNotificationPermissions() {
    if (this.platform.is(PlatformType.Cordova)) {
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

  onTokenRefresh(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      if (this.platform.is(PlatformType.Cordova)) {
        this.firebase
          .getToken()
          .then((token) => {
            console.log('FCM Token:', token);
            resolve(token);
          })
          .catch((error) => {
            console.error('Error getting FCM token', error);
            reject(error);
          });
      } else {
        resolve(null); // Return null if not on Cordova platform
      }
    });
  }
}
