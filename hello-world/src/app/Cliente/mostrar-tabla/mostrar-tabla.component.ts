import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente/cliente.service';

@Component({
  selector: 'app-mostrar-tabla',
  templateUrl: './mostrar-tabla.component.html',
  styleUrls: ['./mostrar-tabla.component.css'],
})
export class MostrarTablaComponent implements OnInit {
  clientes: any = [];
  first = 0;
  rows = 6;

  constructor(private servicioCliente: ClienteService) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes() {
    this.servicioCliente
      .buscarClientes()
      .subscribe((response: any) => this.mostrarClientes(response));
  }

  mostrarClientes(clientes: any) {
    this.clientes = clientes;
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.clientes
      ? this.first === this.clientes.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.clientes ? this.first === 0 : true;
  }
}
