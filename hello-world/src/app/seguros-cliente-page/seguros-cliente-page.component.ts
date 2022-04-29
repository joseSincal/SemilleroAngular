import { Component, OnInit } from '@angular/core';
import { SeguroService } from 'src/app/servicios/seguro/seguro.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seguros-cliente-page',
  templateUrl: './seguros-cliente-page.component.html',
  styleUrls: ['./seguros-cliente-page.component.css'],
})
export class SegurosClientePageComponent implements OnInit {
  seguros: any;
  first = 0;
  rows = 5;
  dniCliente: any;

  constructor(
    private servicioSeguro: SeguroService,
    private ar: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ar.params.subscribe((params) => {
      this.dniCliente = params['dniCliente'];
      this.obtenerCliente();
    });
  }

  obtenerCliente() {
    this.servicioSeguro
      .getForCliente(this.dniCliente)
      .subscribe((response: any) => this.mostrarCliente(response));
  }

  mostrarCliente(seguros: any) {
    this.seguros = seguros;
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
    return this.seguros ? this.first === this.seguros.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.seguros ? this.first === 0 : true;
  }

  regresar() {
    this.router.navigate(['/cliente']);
  }
}
