import { Component, OnInit } from '@angular/core';
import { JsonHelper } from 'src/app/shared/helpers/json.helper';
import { AlertasHelper } from 'src/app/shared/helpers/alertas.helper';
import { ReporteService } from '../shared/reporte.service';
import { DateHelper } from 'src/app/shared/helpers/date.helper';
import { NumberHelper } from 'src/app/shared/helpers/number-helper';

@Component({
  selector: 'tmts-reporte-empleado',
  templateUrl: './reporte-empleado.component.html',
  styles: []
})
export class ReporteEmpleadoComponent {

  public detallePresentacion: any[] = [];
  public modelFechaInicio: Date;
  public modelFechaFinal: Date;
  private empleadoId = 0;
  public totalGeneral = 0;

  constructor(
    private service: ReporteService,
  ) { }


  public buscarDatos(): void {

    this.detallePresentacion = [];

    const fecha1 = DateHelper.obtenerFecha(this.modelFechaInicio);
    const fecha2 = DateHelper.obtenerFecha(this.modelFechaFinal);

    if (fecha1 === null) {
      AlertasHelper.show('You must specify the start date');
      return;
    }

    if (fecha2 === null) {
      AlertasHelper.show('You must specify the end date');
      return;
    }

    const fechaInicio = `${fecha1.getFullYear()}-${fecha1.getMonth()}-${fecha1.getDate()}`;
    const fechaFinal = `${fecha2.getFullYear()}-${fecha2.getMonth()}-${fecha2.getDate()}`;

    this.service
      .getReporte(fechaInicio, fechaFinal, this.empleadoId)
      .subscribe(data => {

        if (data.value.length <= 0) {
          AlertasHelper.show(`There's no data for the filter`);
          return;
        }

        this.detallePresentacion = JsonHelper.newObject(data.value);
        this.calcularTotal();
      }, (error: Response) => {
        AlertasHelper.showError(error);
      });
  }

  private calcularTotal(): void {
    let total = 0;
    this.totalGeneral = 0;

    for (const item of this.detallePresentacion) {
      total += NumberHelper.getNum(item.cantidadHorasEnPunto);
    }

    this.totalGeneral = total;
  }

  public cambioEmpleado(event): void {
    this.empleadoId = 0;

    if (event) {
      this.empleadoId = event.empleadoId;
    }
  }
}
