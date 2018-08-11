import {Component, OnInit} from '@angular/core';

declare const gapi;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private googleAuth;

  protected showOverlay = true;

  constructor(
    // private appRef: ApplicationRef
  ) {
  }

  ngOnInit(): void {
    console.log('---> ngOnInit');
    console.log('---> showOverlay = ' + this.showOverlay);

    const script = document.createElement('script');
    script.src = '//apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      gapi
        .load('auth2', () => { // https://developers.google.com/identity/sign-in/web/reference#auth-setup
          gapi.auth2
            .init({            // https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams
              client_id: '716416430576-ksug2522srtilui6sbs2join1i95c65p.apps.googleusercontent.com' // http://localhost:4200/
            })
            .then(             // https://developers.google.com/identity/sign-in/web/reference#googleauththenoninit-onerror
              googleAuth => {
                this.googleAuth = googleAuth;
                this.showOverlay = false;
                console.log('---> showOverlay = ' + this.showOverlay);
                // this.appRef.tick();
              },
              error => {
                // on init error 'showOverlay' still remains equals to 'true'
              });
        });
    };
    document.head.appendChild(script);
  }

  performSignInOnGoogleServer() {
    const signInResult = this.googleAuth.signIn(); // https://developers.google.com/identity/sign-in/web/reference#googleauthsignin

    signInResult.then(
      googleUser => {
        const profile = googleUser.getBasicProfile();
        console.log('email >> ' + profile.getEmail());
      },
      error => {
        console.log('error >> ' + error);
      });
  }
}
