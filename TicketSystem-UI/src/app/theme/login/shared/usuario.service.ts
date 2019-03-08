import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import { Usuario } from './usuario.model';
import { ServiceHelper } from 'src/app/shared/helpers/service.helper';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class UsuarioService extends DataService<Usuario> {

  constructor(
    http: HttpClient
  ) {
    super(http, environment.routes.api + environment.routes.apiUsuarios + '/IniciarSesion');
  }

  public iniciarSesion(nombre: string, password: string): Observable<any> {

    const params = new HttpParams()
          .set('userName', `${nombre}`)
          .set('password', `${password}`);

    return this
      .http
      .get(this.urlBase, { headers: this.headers, params: params })
      .pipe(map(response => response))
      .pipe(catchError(error => ServiceHelper.handleError(error)));
  }

  protected mapToObject(response: any): Usuario {
    throw new Error('Method not implemented.');
  }
}
