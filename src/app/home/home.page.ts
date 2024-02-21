import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private platform: Platform,
    private firebase: FirebaseX,
    private http: HttpClient
  ) {}

  postTokenToApi(token: string) {
    if (token) {
      // API endpoint
      const apiEndpoint =
        'https://4911-2405-201-c04a-70c3-907b-e8c9-400-162b.ngrok-free.app/send-message';

      // Create a FormData object instead of a JSON object
      const formData = new FormData();

      // Add the token to FormData with the key 'token'
      formData.append('token', token);

      // Set the headers to accept form-data
      const headers = new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      });

      // Make a POST request with the FormData object
      this.http.post(apiEndpoint, formData).subscribe(
        (response) => {
          console.log('Token posted successfully:', response);
        },
        (error: Error) => {
          console.error('Error posting token to API:', error.message);
        }
      );
    } else {
      console.error('FCM Token is null');
    }
  }

  sendNotification() {
    if (this.platform.is('cordova')) {
      this.firebase
        .getToken()
        .then((token) => {
          if (token) {
            console.log('Sending notification for FCM Token:', token);
            // Post the FCM token to the provided API on button click
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
}
