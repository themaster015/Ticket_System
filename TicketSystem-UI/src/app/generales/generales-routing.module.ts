import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralesComponent } from './generales.component';
import { ReporteEmpleadoComponent } from './reporte/reporte-empleado/reporte-empleado.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralesComponent,
    children: [
       { path: '', redirectTo: 'empleado', pathMatch: 'full' },
       { path: 'empleado', loadChildren: './empleado/empleado.module#EmpleadoModule' },
       { path: 'ticket', loadChildren: './ticket/ticket.module#TicketModule' },
       { path: 'reporte', component: ReporteEmpleadoComponent },
       { path: 'usuario', loadChildren: './usuario/usuario.module#UsuarioModule' },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralesRoutingModule { }
