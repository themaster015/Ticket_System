export class TicketEmpleado {
  constructor(
    public ticketEmpleadoId: number,
    public ticketId: number,
    public empleadoId: number,
    public empleadoNombre: string,
    public estaEditando: boolean
  ) {}
}
