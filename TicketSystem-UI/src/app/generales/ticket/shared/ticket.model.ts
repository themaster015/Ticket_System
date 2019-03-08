import { TicketEmpleado } from './ticket-empleado.model';
import { TicketEntrada } from './ticket-entrada.model';

export class Ticket {
  constructor(
    public ticketId: number,
    public numero: string,
    public tema: string,
    public descripcion: string,
    public fechaCreacion: Date,
    public ticketEstadoId: number,
    public ticketEstadoDescripcion: string,
    public listaEmpleado: TicketEmpleado[] | null,
    public ListaEntrada: TicketEntrada[] | null,
  ) {}
}
