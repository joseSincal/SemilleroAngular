import { Component, OnInit } from '@angular/core';
import { CompaniaSeguroService } from 'src/app/servicios/companiaSeguro/compania-seguro.service';
import { CompaniaService } from 'src/app/servicios/compania/compania.service';
import { SeguroService } from 'src/app/servicios/seguro/seguro.service';
import { LazyLoadEvent } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-compania-seguro-page',
  templateUrl: './compania-seguro-page.component.html',
  styleUrls: ['./compania-seguro-page.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class CompaniaSeguroPageComponent implements OnInit {
  registros: any;
  registro: any = {};
  seguros: any;
  companias: any;
  totalRecords: number;
  loading: boolean;
  evento: LazyLoadEvent;
  formDialog: boolean;

  constructor(
    private servicioCS: CompaniaSeguroService,
    private servicioCompania: CompaniaService,
    private servicioSeguro: SeguroService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.servicioCompania.getAll().subscribe((response: any) => {
      this.mostrarCompanias(response);
    })
    this.servicioSeguro.getAll().subscribe((response: any) => {
      this.mostrarSeguros(response);
    })
  }

  mostrarRegistros(registros: any) {
    this.registros = registros;
  }

  mostrarCompanias(companias: any) {
    this.companias = companias;
  }

  mostrarSeguros(seguros: any) {
    this.seguros = seguros;
  }

  loadRegistros(event: LazyLoadEvent) {
    this.evento = event;
    this.actualizarDatos();
  }

  actualizarDatos() {
    this.loading = true;
    setTimeout(() => {
      let first: any = this.evento.first;
      let rows: any = this.evento.rows;
      let page: any = first / rows;
      this.servicioCS
        .obtenerPagina(page, this.evento.rows)
        .subscribe((response: any) => {
          this.mostrarRegistros(response.content);
          this.totalRecords = response.totalElements;
        });
      this.loading = false;
    }, 600);
  }

  hideDialog() {
    this.formDialog = false;
    this.actualizarDatos();
  }

  guardar() {
    let formulario: any = document.getElementById('formulario');
    if (formulario.reportValidity()) {
      this.servicioCS.guarda(this.registro).subscribe((response: any) => {
        this.finalizarGuardar(response);
      });
    }
  }

  eliminar(id: number) {
    this.confirmationService.confirm({
      message: `¿Deseas eliminar este registro? No podrás deshacer esta acción`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.servicioCS.eliminar(id).subscribe((response: any) => {
          this.finalizarEliminar(response);
        });
      },
    });
  }

  finalizarGuardar(res: any) {
    this.registro = {};
    this.formDialog = false;
    this.actualizarDatos();
    this.showToast('success', 'Compania creada y agregada a la base de datos');
  }

  finalizarEliminar(res: any) {
    this.actualizarDatos();
    this.showToast('success', 'Compania eliminada sin problemas');
  }

  crear() {
    this.registro = {};
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
