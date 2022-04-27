import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { SiniestroService } from 'src/app/servicios/siniestro/siniestro.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-siniestro-page',
  templateUrl: './siniestro-page.component.html',
  styleUrls: ['./siniestro-page.component.css'],
  providers: [MessageService, ConfirmationService], 
})
export class SiniestroPageComponent implements OnInit {
  siniestros: any;
  siniestro: any = {};
  aceptado: boolean = false;
  poliza?: number;
  dniPerito?: number;
  totalRecords: number;
  loading: boolean;
  evento: LazyLoadEvent;
  formDialog: boolean;
  edit: boolean;

  constructor(
    private servicioSiniestro: SiniestroService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loading = true;
  }

  mostrarSiniestros(siniestros: any) {
    this.siniestros = siniestros;
  }

  loadSiniestros(event: LazyLoadEvent) {
    this.evento = event;
    this.actualizarDatos();
  }

  actualizarDatos() {
    this.loading = true;
    setTimeout(() => {
      let first: any = this.evento.first;
      let rows: any = this.evento.rows;
      let page: any = first / rows;
      this.servicioSiniestro
        .obtenerPagina(page, this.evento.rows)
        .subscribe((response: any) => {
          this.mostrarSiniestros(response.content);
          this.totalRecords = response.totalElements;
        });
      this.loading = false;
    }, 600);
  }

  hideDialog() {
    this.formDialog = false;
    this.edit = false;
    this.actualizarDatos();
  }

  enviarSiniestro() {
    let formulario: any = document.getElementById('formulario');
    if (formulario.reportValidity()) {
      let part1 = this.siniestro.fechaSiniestro.split('/');
      this.siniestro.fechaSiniestro = `${part1[2]}-${part1[1]}-${part1[0]}`;
      console.log(this.siniestro.fechaSiniestro);
      this.siniestro.aceptado = this.aceptado ? "1" : "0";
      this.servicioSiniestro
        .guardaSiniestro(this.siniestro, this.poliza!, this.dniPerito!)
        .subscribe((response: any) => {
          this.finalizarGuardar(response);
        });
    }
  }

  eliminarSiniestro(id: number) {
    this.confirmationService.confirm({
      message: `¿Deseas eliminar este siniestro? No podrás deshacer esta acción`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.servicioSiniestro
          .eliminarSiniestro(id)
          .subscribe((response: any) => {
            this.finalizarEliminar(response);
          });
      },
    });
  }

  finalizarGuardar(res: any) {
    this.siniestro = {};
    this.poliza = undefined;
    this.dniPerito = undefined;
    this.aceptado = false;
    this.formDialog = false;
    this.actualizarDatos();
    this.edit
      ? this.showToast('success', 'Datos del siniestro editados correctamente')
      : this.showToast(
          'success',
          'Siniestro creado y agregado a la base de datos'
        );
    this.edit = false;
  }

  finalizarEliminar(res: any) {
    this.actualizarDatos();
    this.showToast('success', 'Siniestro eliminado sin problemas');
  }

  crearSiniestro() {
    this.siniestro = {};
    this.poliza = undefined;
    this.dniPerito = undefined;
    this.aceptado = false;
    this.edit = false;
    this.formDialog = true;
  }

  editarSiniestro(siniestro: any) {
    let part1 = siniestro.fechaSiniestro.split('-');
    siniestro.fechaSiniestro = `${part1[2]}/${part1[1]}/${part1[0]}`;
    this.aceptado = siniestro.aceptado == "1" ? true : false;
    this.dniPerito = siniestro.perito.dniPerito;
    this.poliza = siniestro.seguro.numeroPoliza;

    this.siniestro = siniestro;
    this.edit = true;
    this.formDialog = true;
  }

  showToast(type: string, message: string) {
    this.messageService.add({
      severity: type,
      summary: 'Proceso exitoso',
      detail: message,
    });
  }

}
