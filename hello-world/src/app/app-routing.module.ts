import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { ClientPageComponent } from './client-page/client-page.component';
import { CompanyPageComponent } from './company-page/company-page.component';
import { PeritoPageComponent } from './perito-page/perito-page.component';
import { SeguroPageComponent } from "./seguro-page/seguro-page.component";

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'cliente', component: ClientPageComponent },
  { path: 'compania', component: CompanyPageComponent },
  { path: 'perito', component: PeritoPageComponent },
  { path: 'seguro', component: SeguroPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
