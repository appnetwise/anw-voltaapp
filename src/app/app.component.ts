import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private firebase: FirebaseX) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Initialize Firebase plugin here
      this.firebase.onMessageReceived().subscribe((data) => {
        // Handle incoming push notifications
        console.log(data);
      });
    });
  }
}
