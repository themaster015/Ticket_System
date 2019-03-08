import { DataService } from 'src/app/shared/services/data.service';
import { Injectable } from '@angular/core';
import { Empleado } from './empleado.model';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmpleadoService extends DataService<Empleado> {

  constructor(
    http: HttpClient
  ) {
    super(http, environment.routes.api + environment.routes.apiEmpleados);
  }

  protected mapToObject(response: any): Empleado {
    return new Empleado(
      response.value.empleadoId,
      response.value.identificador,
      response.value.nombre,
      response.value.apellido,
      response.value.cedula,
      response.value.email,
      response.value.sexo,
      response.value.fechaNacimiento,
      this.toDate(response.value.fechaCreacion),
      response.value.estado
      );
  }
}
