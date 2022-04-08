import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.css'],
  providers: [MessageService],
})
export class FormularioClienteComponent implements OnInit {
  cliente: any = {};
  id: any;
  edit: boolean = false;
  add: boolean = false;

  constructor(
    private clienteSevice: ClienteService,
    private messageService: MessageService,
    private aRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.aRoute.params.subscribe((params) => {
      if (params['dniCl']) {
        this.id = params['dniCl'];
        this.edit = true;
        this.clienteSevice.buscarCliente(this.id).subscribe((res: any) => {
          this.obtenerCliente(res);
        });
      }
    });
  }
  
  enviarCliente() {
    let formulario: any = document.getElementById('formularioCliente');
    if (formulario.reportValidity()) {
      this.clienteSevice
        .guardaCliente(this.cliente)
        .subscribe((response: any) => {
          this.finalizarGuardar(response)
        });
    }
  }

  finalizarGuardar(res: any) {
    this.cliente = {};
    this.edit
      ? this.showToast('success', 'Cliente editado con éxito', 'Redireccionando...')
      : this.showToast('success', 'Cliente creado con éxito', 'Redireccionando...');
  }

  obtenerCliente(res: any) {
    this.cliente = res;
  }

  showToast(type: string, title: string, message: string) {
    this.messageService.add({severity: type, summary: title, detail: message});
  }

  mostrarFormulario() {
    this.add = true;
  }

}
