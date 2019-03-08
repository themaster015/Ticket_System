import { DataService } from 'src/app/shared/services/data.service';
import { Ticket } from './ticket.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TicketService extends DataService<Ticket> {

  constructor(
    http: HttpClient
  ) {
    super(http, environment.routes.api + environment.routes.apiTickets);
  }

  protected mapToObject(response: any): Ticket {
    return new Ticket(
      response.value.ticketId,
      response.value.numero,
      response.value.tema,
      response.value.descripcion,
      this.toDate(response.value.fechaCreacion),
      response.value.ticketEstadoId,
      response.value.ticketEstadoDescripcion,
      response.value.listaEmpleado,
      response.value.listaEntrada
    );
  }
}






