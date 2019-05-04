// environment.ts
export const environment = {
  production: false,
  auth: {
    clientID: 'mgxyX1BwLjXDWZP6FObN92J1DcE3zl3G',
    domain: 'dong82.auth0.com/', // e.g., you.auth0.com
    audience: 'http://localhost:3001',
    redirect: 'http://localhost:4200/callback',
    scope: 'openid profile email'
  }
};

export let authData = {
  expiresAt: null,
  userProfile: null,
  accessToken: null,
  authenticated: null
};
