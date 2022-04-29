import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { ClientPageComponent } from './client-page/client-page.component';
import { CompanyPageComponent } from './company-page/company-page.component';
import { PeritoPageComponent } from './perito-page/perito-page.component';
import { SeguroPageComponent } from './seguro-page/seguro-page.component';
import { SiniestroPageComponent } from './siniestro-page/siniestro-page.component';
import { SiniestrosPorPeritoComponent } from './siniestros-por-perito/siniestros-por-perito.component';
import { CompaniaSeguroPageComponent } from './compania-seguro-page/compania-seguro-page.component';
import { SegurosClientePageComponent } from './seguros-cliente-page/seguros-cliente-page.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'cliente', component: ClientPageComponent },
  { path: 'compania', component: CompanyPageComponent },
  { path: 'perito', component: PeritoPageComponent },
  { path: 'seguro', component: SeguroPageComponent },
  { path: 'siniestro', component: SiniestroPageComponent },
  { path: 'siniestro/:dniPerito', component: SiniestrosPorPeritoComponent },
  { path: 'companiaseguro', component: CompaniaSeguroPageComponent },
  {
    path: 'cliente/:dniCliente/seguros',
    component: SegurosClientePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
