import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { ClientPageComponent } from './client-page/client-page.component';
import { CompanyPageComponent } from './company-page/company-page.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'cliente', component: ClientPageComponent },
  { path: 'compania', component: CompanyPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
