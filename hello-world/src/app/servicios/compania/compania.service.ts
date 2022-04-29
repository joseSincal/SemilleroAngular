import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompaniaService {
  constructor(private http: HttpClient) {}

  private consumirGet(url: string) {
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

  private consumirDelete(url: string): Observable<any> {
    return this.http
      .delete<any>(environment.urlService + url)
      .pipe(catchError((e) => this.manejarError(e)));
  }

  private manejarError(error: any) {
    return throwError(() => `Hubo un error: ${error}`);
  }

  obtenerPagina(pagina?: number, cantidad?: number) {
    return this.consumirGet(`compania/buscar/paginacion/${pagina}/${cantidad}`);
  }

  guardaCompania(compania: any) {
    return this.consumirPost('compania/guardar', compania);
  }

  eliminarComania(nombreCompania: string) {
    return this.consumirDelete(`compania/eliminar/${nombreCompania}`);
  }

  getAll() {
    return this.consumirGet('compania/buscar');
  }
}
