import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketComponent } from './ticket.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { TicketViewComponent } from './ticket-view/ticket-view.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TicketService } from './shared/ticket.service';
import { TicketFormEmpleadoComponent } from './ticket-form/ticket-form-empleado/ticket-form-empleado.component';
import { EmpleadoModule } from '../empleado/empleado.module';
import { TicketFormEntryComponent } from './ticket-form/ticket-form-entry/ticket-form-entry.component';

@NgModule({
  declarations: [
    TicketComponent,
    TicketFormComponent,
    TicketViewComponent,
    TicketListComponent,
    TicketFormEmpleadoComponent,
    TicketFormEntryComponent],
  imports: [
    CommonModule,
    TicketRoutingModule,
    SharedModule,
    EmpleadoModule
  ],
  providers: [
    TicketService
  ]
})
export class TicketModule { }
