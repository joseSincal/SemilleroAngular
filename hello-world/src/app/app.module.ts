import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { WelcomeComponent } from './welcome/welcome.component';
import { AgregarComponent as AddClient } from './Cliente/agregar/agregar.component';
import { MostrarTablaComponent as ViewClient } from './Cliente/mostrar-tabla/mostrar-tabla.component';
import { AgregarComponent as AddCompany } from './Compania/agregar/agregar.component';
import { MostrarTablaComponent as ViewCompany } from './Compania/mostrar-tabla/mostrar-tabla.component';

@NgModule({
  declarations: [AppComponent, WelcomeComponent, AddClient, ViewClient, AddCompany, ViewCompany],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    TableModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
