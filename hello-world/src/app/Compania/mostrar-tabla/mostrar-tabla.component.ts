import { Component, OnInit } from '@angular/core';
import { CompaniaService } from 'src/app/servicios/compania/compania.service';

@Component({
  selector: 'app-mostrar-tabla',
  templateUrl: './mostrar-tabla.component.html',
  styleUrls: ['./mostrar-tabla.component.css'],
})
export class MostrarTablaComponent implements OnInit {
  companias: any = [];
  first = 0;
  rows = 6;

  constructor(private servicioCompania: CompaniaService) {}

  ngOnInit(): void {
    this.obtenerCompanias();
  }

  obtenerCompanias() {
    this.servicioCompania
      .buscarCompanias()
      .subscribe((response: any) => this.mostrarCompanias(response));
  }

  mostrarCompanias(companias: any) {
    this.companias = companias;
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
    return this.companias
      ? this.first === this.companias.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.companias ? this.first === 0 : true;
  }
}
