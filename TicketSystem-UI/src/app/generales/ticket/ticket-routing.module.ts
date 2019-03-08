import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketComponent } from './ticket.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { TicketViewComponent } from './ticket-view/ticket-view.component';
import { TicketFormEntryComponent } from './ticket-form/ticket-form-entry/ticket-form-entry.component';

const routes: Routes = [
  {
     path: '',
     component: TicketComponent,
     children: [
       { path: '', component: TicketListComponent },
       { path: ':id/form', component: TicketFormComponent },
       { path: ':id/edit', component: TicketFormComponent },
       { path: ':id/view', component: TicketViewComponent },
       { path: ':id/entry', component: TicketFormEntryComponent },
       { path: ':id/view/:idEntry/entry', component: TicketFormEntryComponent },

     ]
   }
 ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
