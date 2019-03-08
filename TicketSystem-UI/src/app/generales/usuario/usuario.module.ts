import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioViewComponent } from './usuario-view/usuario-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Usuario2Service } from './shared/usuario2.service';

@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioFormComponent,
    UsuarioListComponent,
    UsuarioViewComponent],
  imports: [
    SharedModule,
    CommonModule,
    UsuarioRoutingModule
  ],
  providers: [
    Usuario2Service
  ]

})
export class UsuarioModule { }
