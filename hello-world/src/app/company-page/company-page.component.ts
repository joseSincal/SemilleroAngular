import { Component, OnInit } from '@angular/core';
import { CompaniaService } from 'src/app/servicios/compania/compania.service';
import { LazyLoadEvent } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class CompanyPageComponent implements OnInit {
  companias: any;
  compania: any = {};
  totalRecords: number;
  loading: boolean;
  evento: LazyLoadEvent;
  formDialog: boolean;
  edit: boolean;

  constructor(
    private servicioCompania: CompaniaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loading = true;
  }

  mostrarCompanias(companias: any) {
    this.companias = companias;
  }

  loadCompanias(event: LazyLoadEvent) {
    this.evento = event;
    this.actualizarDatos();
  }

  actualizarDatos() {
    this.loading = true;
    setTimeout(() => {
      let first: any = this.evento.first;
      let rows: any = this.evento.rows;
      let page: any = first / rows;
      this.servicioCompania
        .obtenerPagina(page, this.evento.rows)
        .subscribe((response: any) => {
          this.mostrarCompanias(response.content);
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

  enviarCompania() {
    let formulario: any = document.getElementById('formulario');
    if (formulario.reportValidity()) {
      this.servicioCompania
        .guardaCompania(this.compania)
        .subscribe((response: any) => {
          this.finalizarGuardar(response);
        });
    }
  }

  eliminarCompania(nombre: string) {
    this.confirmationService.confirm({
      message: `¿Deseas eliminar esta compania? No podrás deshacer esta acción`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.servicioCompania
          .eliminarComania(nombre)
          .subscribe((response: any) => {
            this.finalizarEliminar(response);
          });
      },
    });
  }

  finalizarGuardar(res: any) {
    this.compania = {};
    this.formDialog = false;
    this.actualizarDatos();
    this.edit
      ? this.showToast('success', 'Datos de la compania editados correctamente')
      : this.showToast(
          'success',
          'Compania creada y agregada a la base de datos'
        );
    this.edit = false;
  }

  finalizarEliminar(res: any) {
    this.actualizarDatos();
    this.showToast('success', 'Compania eliminada sin problemas');
  }

  crearCompania() {
    this.compania = {};
    this.edit = false;
    this.formDialog = true;
  }

  editarCliente(compania: any) {
    this.compania = compania;
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
