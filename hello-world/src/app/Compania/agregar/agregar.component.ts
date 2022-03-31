import { Component, OnInit } from '@angular/core';
import { CompaniaService } from 'src/app/servicios/compania/compania.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent implements OnInit {
  compania: any = {};

  constructor(private servicioCompania: CompaniaService) {}

  ngOnInit(): void {}

  enviarCompania() {
    let formulario: any = document.getElementById('formularioCompania');
    if (formulario.reportValidity()) {
      this.servicioCompania
        .guardarCompania(this.compania)
        .subscribe((response: any) => this.finalizarGuardar(response));
    }
  }

  finalizarGuardar(res: any) {
    this.compania = {};
    alert('Compania creada con éxito.');
  }
}
