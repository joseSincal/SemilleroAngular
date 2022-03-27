import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, Observable, observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }

  private consumirGet(url:string):Observable<any> {
    return this.http.get<any>(environment.urlService + url).pipe(
      catchError(e => this.manejarError(e))
    );
  }

  private manejarError(error:any) {
    return throwError(() => `Hubo un error: ${error}`);
  }

  buscarClientes() {
    return this.consumirGet("cliente/buscar");
  }


}
