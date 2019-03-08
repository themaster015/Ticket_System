export class TicketEntrada {
  constructor(
    public ticketEntradaId: number,
    public ticketId: number,
    public empleadoId: number,
    public fechaInicio: Date,
    public fechaFinal: Date,
    public nota: string,
  ) { }
}
