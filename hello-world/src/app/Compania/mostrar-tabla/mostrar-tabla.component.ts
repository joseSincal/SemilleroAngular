import { Component, OnInit } from '@angular/core';
import { CompaniaService } from 'src/app/servicios/compania/compania.service';

@Component({
  selector: 'app-mostrar-tabla',
  templateUrl: './mostrar-tabla.component.html',
  styleUrls: ['./mostrar-tabla.component.css'],
})
export class MostrarTablaComponent implements OnInit {
  companias: any = [];

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
}
