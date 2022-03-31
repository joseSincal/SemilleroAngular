import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente/cliente.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent implements OnInit {
  cliente: any = {};

  constructor(private servicioCliente: ClienteService) {}

  ngOnInit(): void {}

  enviarCliente() {
    let formulario: any = document.getElementById('formularioCliente');
    if (formulario.reportValidity()) {
      this.servicioCliente
        .guardaCliente(this.cliente)
        .subscribe((response: any) => this.finalizarGuardar(response));
    }
  }

  finalizarGuardar(res: any) {
    this.cliente = {};
    alert('Cliente creado con éxito.');
  }
}
