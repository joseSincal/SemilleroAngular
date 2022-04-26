import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { SeguroService } from 'src/app/servicios/seguro/seguro.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-seguro-page',
  templateUrl: './seguro-page.component.html',
  styleUrls: ['./seguro-page.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class SeguroPageComponent implements OnInit {
  seguros: any;
  seguro: any = {};
  totalRecords: number;
  loading: boolean;
  evento: LazyLoadEvent;
  formDialog: boolean;
  edit: boolean;

  constructor(
    private servicioSeguro: SeguroService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loading = true;
  }

  mostrarSeguros(seguros: any) {
    this.seguros = seguros;
  }

  loadSeguros(event: LazyLoadEvent) {
    this.evento = event;
    this.actualizarDatos();
  }

  actualizarDatos() {
    this.loading = true;
    setTimeout(() => {
      let first: any = this.evento.first;
      let rows: any = this.evento.rows;
      let page: any = first / rows;
      this.servicioSeguro
        .obtenerPagina(page, this.evento.rows)
        .subscribe((response: any) => {
          this.mostrarSeguros(response.content);
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

  enviarSeguro() {
    let formulario: any = document.getElementById('formulario');
    if (formulario.reportValidity()) {
      let part1 = this.seguro.fechaInicio.split('/');
      this.seguro.fechaInicio = `${part1[2]}-${part1[1]}-${part1[0]}`;
      let part2 = this.seguro.fechaVencimiento.split('/');
      this.seguro.fechaVencimiento = `${part2[2]}-${part2[1]}-${part2[0]}`;
      this.servicioSeguro
        .guardaSeguro(this.seguro)
        .subscribe((response: any) => {
          this.finalizarGuardar(response);
        });
    }
  }

  eliminarSeguro(poliza: number) {
    this.confirmationService.confirm({
      message: `¿Deseas eliminar este seguro? No podrás deshacer esta acción`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.servicioSeguro
          .eliminarSeguro(poliza)
          .subscribe((response: any) => {
            this.finalizarEliminar(response);
          });
      },
    });
  }

  finalizarGuardar(res: any) {
    this.seguro = {};
    this.formDialog = false;
    this.actualizarDatos();
    this.edit
      ? this.showToast('success', 'Datos del seguro editados correctamente')
      : this.showToast(
          'success',
          'Seguro creado y agregado a la base de datos'
        );
    this.edit = false;
  }

  finalizarEliminar(res: any) {
    this.actualizarDatos();
    this.showToast('success', 'Seguro eliminado sin problemas');
  }

  crearSeguro() {
    this.seguro = {};
    this.edit = false;
    this.formDialog = true;
  }

  editarSeguro(seguro: any) {
    let part1 = seguro.fechaInicio.split('-');
    seguro.fechaInicio = `${part1[2]}-${part1[1]}-${part1[0]}`;
    let part2 = seguro.fechaVencimiento.split('-');
    seguro.fechaVencimiento = `${part2[2]}-${part2[1]}-${part2[0]}`;
    this.seguro = seguro;
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
