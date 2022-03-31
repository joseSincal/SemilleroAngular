import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompaniaService {

  constructor(private http:HttpClient) { }

  private consumirGet(url:string):Observable<any> {
    return this.http.get<any>(environment.urlService + url).pipe(
      catchError(e => this.manejarError(e))
    );
  }

  private consumirPost(url:string, pametro:any):Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<any>(environment.urlService + url, pametro, httpOptions).pipe(
      catchError(e => this.manejarError(e))
    );
  }

  private manejarError(error:any) {
    return throwError(() => `hubo un error: ${error}`);
  }

  buscarCompanias() {
    return this.consumirGet("compania/buscar")
  }

  guardarCompania(compania:any) {
    return this.consumirPost("compania/guardar", compania)
  }

}
