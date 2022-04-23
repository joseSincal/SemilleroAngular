import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ClienteService } from 'src/app/servicios/cliente/cliente.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class ClientPageComponent implements OnInit {
  clientes: any;
  cliente: any = {};
  totalRecords: number;
  loading: boolean;
  formDialog: boolean;
  edit: boolean;

  constructor(
    private servicioCliente: ClienteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loading = true;
  }

  obtenerClientes() {
    this.servicioCliente
      .buscarClientes()
      .subscribe((response: any) => this.mostrarClientes(response));
  }

  mostrarClientes(clientes: any) {
    this.clientes = clientes;
  }

  loadClientes(event: LazyLoadEvent) {
    this.loading = true;

    setTimeout(() => {
      let first: any = event.first;
      let rows: any = event.rows;
      let page: any = first / rows;
      this.servicioCliente
        .obtenerPagina(page, event.rows)
        .subscribe((response: any) => {
          this.mostrarClientes(response.content);
          this.totalRecords = response.totalElements;
        });
      this.loading = false;
    }, 600);
  }

  hideDialog() {
    this.formDialog = false;
    this.edit = false;
  }

  enviarCliente() {
    let formulario: any = document.getElementById('formulario');
    if (formulario.reportValidity()) {
      this.servicioCliente
        .guardaCliente(this.cliente)
        .subscribe((response: any) => {
          this.finalizarGuardar(response);
        });
    }
  }

  eliminarCliente(dni: number) {
    this.confirmationService.confirm({
      message: `¿Deseas eliminar este cliente? No podrás deshacer esta acción`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.servicioCliente.eliminarCliente(dni).subscribe((response: any) => {
          this.finalizarEliminar(response);
        })
      },
    });
  }

  finalizarGuardar(res: any) {
    this.cliente = {};
    this.formDialog = false;
    this.obtenerClientes();
    this.edit
      ? this.showToast(
          'success',
          'Datos del cliente editados correctamente',
        )
      : this.showToast(
          'success',
          'Cliente creado y agregado a la base de datos',
        );
    this.edit = false;
  }

  finalizarEliminar(res: any) {
    this.obtenerClientes();
    this.showToast(
      'success',
      'Cliente eliminado sin problemas',
    );
  }

  crearCliente() {
    this.cliente = {};
    this.edit = false;
    this.formDialog = true;
  }

  editarCliente(cliente: any) {
    this.cliente = cliente;
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
