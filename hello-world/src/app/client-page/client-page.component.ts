import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ClienteService } from 'src/app/servicios/cliente/cliente.service';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css']
})
export class ClientPageComponent implements OnInit {
  clientes: any = [];
  virtualDatabase: any = [];
  totalRecords: number = 0;
  loading: boolean = false;

  constructor(private servicioCliente: ClienteService) { }

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

  loadCustomers(event: LazyLoadEvent) {
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
    }, 1000);
  }

}
