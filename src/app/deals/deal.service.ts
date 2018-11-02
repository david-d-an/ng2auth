import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Deal } from './deal';
import { AuthService } from './../auth/auth.service';

import { authData } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DealService {
  private publicDealsUrl = 'http://localhost:3001/api/deals/public';
  private privateDealsUrl = 'http://localhost:3001/api/deals/private';

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  // Implement a method to get the public deals
  getPublicDeals() {
    return this.http
      .get<Deal[]>(this.publicDealsUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Implement a method to get the private deals
  getPrivateDeals() {
    // return this.http
    //   .get<Deal[]>(this.privateDealsUrl)
    //   .pipe(
    //     catchError(this.handleError)
    //   );

    const httpHeader = new HttpHeaders()
      .set(
        'Authorization',
        // `Bearer ${this.authService.accessToken}`
        `Bearer ${authData.accessToken}`
      );
    return this.http
      .get<Deal[]>(this.privateDealsUrl, { headers: httpHeader })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Implement a method to handle errors if any
  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return throwError(err.message || err);
  }

  purchase(item) {
    alert(`You bought the: ${item.name}`);
  }
}
