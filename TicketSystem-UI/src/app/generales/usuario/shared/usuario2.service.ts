import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import { ServiceHelper } from 'src/app/shared/helpers/service.helper';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Usuario } from 'src/app/theme/login/shared/usuario.model';

@Injectable()
export class Usuario2Service extends DataService<Usuario> {

  constructor(
    http: HttpClient
  ) {
    super(http, environment.routes.api + environment.routes.apiUsuarios);
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
    return new Usuario (
      response.value.usuarioId,
      response.value.userName,
      response.value.userPassword,
      response.value.empleadoId,
      response.value.esAdministrador,
      '',
      response.value.estado,
    );
  }
}
