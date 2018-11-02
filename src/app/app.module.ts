import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { PrivateDealsComponent } from './private-deals/private-deals.component';
// import { PublicDealsComponent } from './public-deals/public-deals.component';
// import { CallbackComponent } from './callback/callback.component';

import { PrivateDealsModule } from './deals/private-deals/private-deals.module';
import { PublicDealsModule } from './deals/public-deals/public-deals.module';
import { CallbackModule } from './callback/callback.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PrivateDealsModule,
    PublicDealsModule,
    CallbackModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
