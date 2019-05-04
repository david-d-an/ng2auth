import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as auth0 from 'auth0-js';

import { environment, authData } from './../environments/environment';

(window as any).global = window;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Create Auth0 web auth instance
  auth0 = new auth0.WebAuth({
    clientID: environment.auth.clientID,
    domain: environment.auth.domain,
    responseType: 'token',
    redirectUri: environment.auth.redirect,
    audience: environment.auth.audience,
    scope: environment.auth.scope
  });

  // Store authentication data
  // expiresAt: number;
  // userProfile: any;
  // accessToken: string;
  // authenticated: boolean;

  constructor(private router: Router) {
    // console.log('Getting Access Token');
    // this.getAccessToken();
  }

  get isLoggedIn(): boolean {
    // console.log('Checking isLoggedIn');
    // console.log('Time Now: ' + new Date(Date.now()));
    // console.log('Expires at: ' + new Date(this.expiresAt));
    // console.log('Authenticated: ' + this.authenticated);
    // return Date.now() < this.expiresAt && this.authenticated;
    // return Date.now() < this.expiresAt && this.authenticated;

    return Date.now() < authData.expiresAt && authData.authenticated;
  }

  public login() {
    this.auth0.authorize();
  }

  public logout() {
    // Ensure that 'returnTo' is specified in
    // Allowed Logout URLs on Auth0 API setting
    this.auth0.logout({
      returnTo: 'http://localhost:4200',
      clientID: environment.auth.clientID
    });
  }

  public handleLoginCallback() {
    // When Auth0 hash parsed, get profile
    // console.log(auth0);
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        console.log(authResult);
        window.location.hash = '';
        this.getUserInfo(authResult);
      } else if (err) {
        console.error(`Error 1: ${err.error}`);
      }
      this.router.navigate(['/']);
    });
  }

  // private getAccessToken() {
  //   this.auth0.checkSession({}, (err, authResult) => {
  //     if (authResult && authResult.accessToken) {
  //       this.getUserInfo(authResult);
  //     }
  //   });
  // }

  private getUserInfo(authResult) {
    // Use access token to retrieve user's profile and set session
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
      } else if (err) {
        console.error(`Error 3: ${err.error}`);
      }
    });
  }

  private _setSession(authResult, profile) {
    // Save authentication data and update login status subject
    // this.expiresAt = authResult.expiresIn * 1000 + Date.now();
    // this.accessToken = authResult.accessToken;
    // this.userProfile = profile;
    // this.authenticated = true;

    authData.expiresAt = authResult.expiresIn * 1000 + Date.now();
    authData.accessToken = authResult.accessToken;
    authData.userProfile = profile;
    authData.authenticated = true;

    // console.log(authResult.expiresIn);
    // console.log(new Date(this.expiresAt));
    // console.log(authResult.accessToken);
    // console.log(profile);
  }
}
