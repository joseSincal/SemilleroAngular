import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  private consumirGet(url: string): Observable<any> {
    return this.http
      .get<any>(environment.urlService + url)
      .pipe(catchError((e) => this.manejarError(e)));
  }

  private consumirPost(url: string, parametro: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<any>(environment.urlService + url, parametro, httpOptions)
      .pipe(catchError((e) => this.manejarError(e)));
  }

  private manejarError(error: any) {
    return throwError(() => `Hubo un error: ${error}`);
  }

  buscarClientes() {
    return this.consumirGet('cliente/buscar');
  }

  guardaCliente(cliente: any) {
    return this.consumirPost('cliente/guardar', cliente);
  }

  obtenerPagina(pagina?: number, cantidad?: number) {
    return this.consumirGet(`cliente/buscar/Pageable/${pagina}/${cantidad}`);
  }

  buscarCliente(dniCl: number) {
    return this.consumirGet(`cliente/obtener/${dniCl}`);
  }
}
