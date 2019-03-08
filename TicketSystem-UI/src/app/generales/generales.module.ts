import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralesRoutingModule } from './generales-routing.module';
import { GeneralesComponent } from './generales.component';
import { ReporteEmpleadoComponent } from './reporte/reporte-empleado/reporte-empleado.component';
import { SharedModule } from '../shared/shared.module';
import { ReporteService } from './reporte/shared/reporte.service';
import { EmpleadoModule } from './empleado/empleado.module';

@NgModule({
  declarations: [GeneralesComponent, ReporteEmpleadoComponent],
  imports: [
    CommonModule,
    GeneralesRoutingModule,
    SharedModule,
    EmpleadoModule
  ],
  providers: [
    ReporteService
  ]
})
export class GeneralesModule { }
