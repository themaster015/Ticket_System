import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioViewComponent } from './usuario-view/usuario-view.component';

const routes: Routes = [
  {
     path: '',
     component: UsuarioComponent,
     children: [
       { path: '', component: UsuarioListComponent },
       { path: ':id/form', component: UsuarioFormComponent },
       { path: ':id/edit', component: UsuarioFormComponent },
       { path: ':id/view', component: UsuarioViewComponent }
     ]
   }
 ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
