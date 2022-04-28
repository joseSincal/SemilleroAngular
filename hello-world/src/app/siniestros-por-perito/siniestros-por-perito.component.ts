import { Component, OnInit } from '@angular/core';
import { PeritoService } from "src/app/servicios/perito/perito.service";
import { ActivatedRoute, Router } from '@angular/router'; 

@Component({
  selector: 'app-siniestros-por-perito',
  templateUrl: './siniestros-por-perito.component.html',
  styleUrls: ['./siniestros-por-perito.component.css']
})
export class SiniestrosPorPeritoComponent implements OnInit {
  siniestros: any;
  first = 0;
  rows = 5;
  dniPerito: any;

  constructor(private servicioPerito: PeritoService, private ar: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.ar.params.subscribe(params => {
      this.dniPerito = params['dniPerito'];
      this.obtenerSiniestros();
    });
  }

  obtenerSiniestros() {
    this.servicioPerito.obtenerSiniestros(this.dniPerito)
      .subscribe((response: any) => this.mostrarSiniestros(response));
  }

  mostrarSiniestros(siniestros: any) {
    this.siniestros = siniestros;
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
    return this.siniestros
      ? this.first === this.siniestros.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.siniestros ? this.first === 0 : true;
  }

  regresar() {
    this.router.navigate(['/perito'])
  }

}
