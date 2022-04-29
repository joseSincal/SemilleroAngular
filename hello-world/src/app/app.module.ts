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
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';

import { WelcomeComponent } from './welcome/welcome.component';
import { ClientPageComponent } from './client-page/client-page.component';
import { CompanyPageComponent } from './company-page/company-page.component';
import { PeritoPageComponent } from './perito-page/perito-page.component';
import { SeguroPageComponent } from './seguro-page/seguro-page.component';
import { SiniestroPageComponent } from './siniestro-page/siniestro-page.component';
import { SiniestrosPorPeritoComponent } from './siniestros-por-perito/siniestros-por-perito.component';
import { CompaniaSeguroPageComponent } from './compania-seguro-page/compania-seguro-page.component';
import { SegurosClientePageComponent } from './seguros-cliente-page/seguros-cliente-page.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ClientPageComponent,
    CompanyPageComponent,
    PeritoPageComponent,
    SeguroPageComponent,
    SiniestroPageComponent,
    SiniestrosPorPeritoComponent,
    CompaniaSeguroPageComponent,
    SegurosClientePageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    DialogModule,
    ConfirmDialogModule,
    InputMaskModule,
    CheckboxModule,
    KeyFilterModule,
    DropdownModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
