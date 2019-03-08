import { DataService } from 'src/app/shared/services/data.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ServiceHelper } from 'src/app/shared/helpers/service.helper';

@Injectable()
export class ReporteService extends DataService<any> {

  constructor(
    http: HttpClient
  ) {
    super(http, environment.routes.api + environment.routes.apiEmpleados);
  }

  public getReporte(fechaInicio: string, fechaFinal: string, empleadoId: number): Observable<any> {
    const url = `${this.urlBase}/GetReporte/${fechaInicio}/${fechaFinal}/${empleadoId}`;

    return this
      .http
      .get(url, { headers: this.headers })
      .pipe(map(response => response))
      .pipe(catchError(error => ServiceHelper.handleError(error)));
  }

  protected mapToObject(response: any): any {
    return {};
  }
}
