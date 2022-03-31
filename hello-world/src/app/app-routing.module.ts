import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { AgregarComponent as AgregarCliente } from './Cliente/agregar/agregar.component';
import { MostrarTablaComponent as MostrarClientes } from './Cliente/mostrar-tabla/mostrar-tabla.component';
import { AgregarComponent as AgregarCompania } from './Compania/agregar/agregar.component';
import { MostrarTablaComponent as MostrarCompanias } from './Compania/mostrar-tabla/mostrar-tabla.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'cliente', component: MostrarClientes },
  { path: 'cliente/add', component: AgregarCliente },
  { path: 'compania', component: MostrarCompanias },
  { path: 'compania/add', component: AgregarCompania },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
