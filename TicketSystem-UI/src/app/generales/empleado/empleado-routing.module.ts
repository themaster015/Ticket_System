import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpleadoViewComponent } from './empleado-view/empleado-view.component';
import { EmpleadoFormComponent } from './empleado-form/empleado-form.component';
import { EmpleadoListComponent } from './empleado-list/empleado-list.component';
import { EmpleadoComponent } from './empleado.component';

const routes: Routes = [
 {
    path: '',
    component: EmpleadoComponent,
    children: [
      { path: '', component: EmpleadoListComponent },
      { path: ':id/form', component: EmpleadoFormComponent },
      { path: ':id/edit', component: EmpleadoFormComponent },
      { path: ':id/view', component: EmpleadoViewComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoRoutingModule { }
