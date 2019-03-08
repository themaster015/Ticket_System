import { NgModule } from '@angular/core';

import { EmpleadoRoutingModule } from './empleado-routing.module';
import { EmpleadoFormComponent } from './empleado-form/empleado-form.component';
import { EmpleadoListComponent } from './empleado-list/empleado-list.component';
import { EmpleadoViewComponent } from './empleado-view/empleado-view.component';
import { EmpleadoComponent } from './empleado.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmpleadoService } from './shared/empleado.service';
import { SelectEmpleadoComponent } from './select-empleado/select-empleado.component';

@NgModule({
  declarations: [
    EmpleadoFormComponent,
    EmpleadoListComponent,
    EmpleadoViewComponent,
    EmpleadoComponent,
    SelectEmpleadoComponent
  ],
  imports: [
    EmpleadoRoutingModule,
    SharedModule
  ],
  exports: [
    SelectEmpleadoComponent
  ],
  providers: [
    EmpleadoService
  ]
})
export class EmpleadoModule { }
