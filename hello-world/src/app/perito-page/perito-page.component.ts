import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { PeritoService } from 'src/app/servicios/perito/perito.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perito-page',
  templateUrl: './perito-page.component.html',
  styleUrls: ['./perito-page.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class PeritoPageComponent implements OnInit {
  peritos: any;
  perito: any = {};
  totalRecords: number;
  loading: boolean;
  evento: LazyLoadEvent;
  formDialog: boolean;
  edit: boolean;

  constructor(
    private servicioPerito: PeritoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;
  }

  mostrarPeritos(peritos: any) {
    this.peritos = peritos;
  }

  loadPeritos(event: LazyLoadEvent) {
    this.evento = event;
    this.actualizarDatos();
  }

  actualizarDatos() {
    this.loading = true;
    setTimeout(() => {
      let first: any = this.evento.first;
      let rows: any = this.evento.rows;
      let page: any = first / rows;
      this.servicioPerito
        .obtenerPagina(page, this.evento.rows)
        .subscribe((response: any) => {
          this.mostrarPeritos(response.content);
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

  enviarPerito() {
    let formulario: any = document.getElementById('formulario');
    if (formulario.reportValidity()) {
      this.servicioPerito
        .guardaPerito(this.perito)
        .subscribe((response: any) => {
          this.finalizarGuardar(response);
        });
    }
  }

  eliminarPerito(dni: number) {
    this.confirmationService.confirm({
      message: `¿Deseas eliminar este perito? No podrás deshacer esta acción`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.servicioPerito.eliminarPerito(dni).subscribe((response: any) => {
          this.finalizarEliminar(response);
        });
      },
    });
  }

  finalizarGuardar(res: any) {
    this.perito = {};
    this.formDialog = false;
    this.actualizarDatos();
    this.edit
      ? this.showToast('success', 'Datos del perito editados correctamente')
      : this.showToast(
          'success',
          'Perito creado y agregado a la base de datos'
        );
    this.edit = false;
  }

  finalizarEliminar(res: any) {
    this.actualizarDatos();
    this.showToast('success', 'Perito eliminado sin problemas');
  }

  crearPerito() {
    this.perito = {};
    this.edit = false;
    this.formDialog = true;
  }

  editarPerito(perito: any) {
    this.perito = perito;
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

  verSiniestros(dni: number) {
    this.router.navigate([`/siniestro/${dni}`]);
  }

}
