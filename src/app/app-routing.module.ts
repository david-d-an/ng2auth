import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallbackComponent } from './callback/callback.component';
import { PublicDealsComponent } from './deals/public-deals/public-deals.component';
import { PrivateDealsComponent } from './deals/private-deals/private-deals.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'deals', pathMatch: 'full' },
  { path: 'publicdeals', redirectTo: 'deals', pathMatch: 'full' },
  { path: 'privatedeals', redirectTo: 'special', pathMatch: 'full' },
  { path: 'deals', component: PublicDealsComponent },
  { path: 'special', component: PrivateDealsComponent, canActivate: [AuthGuard]},
  { path: 'callback', component: CallbackComponent },
  { path: '**', redirectTo: 'deals', pathMatch: 'full' },
  // { path: 'special', component: PrivateDealsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
