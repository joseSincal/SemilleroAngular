import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../servicios/cliente/cliente.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name: string = "";
  saludo:string = "";
  clientes:any = [];

  constructor(private servicioCliente:ClienteService) {

  }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  saludar() {
    this.saludo = `Hola ${this.name}, mucho gusto!`;
  }

  obtenerClientes() {
    this.servicioCliente.buscarClientes().subscribe(
      (response:any) => this.mostrarClientes(response)
    );
  }

  mostrarClientes(clientes:any) {
    this.clientes = clientes;
  }

}
