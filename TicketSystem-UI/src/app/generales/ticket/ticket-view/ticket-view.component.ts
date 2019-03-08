import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../shared/ticket.service';
import { NumberHelper } from 'src/app/shared/helpers/number-helper';
import { AlertasHelper } from 'src/app/shared/helpers/alertas.helper';
import { Location } from '@angular/common';
import { TicketEstadoEnum } from 'src/app/shared/enums/general-enums';

@Component({
  selector: 'tmts-ticket-view',
  templateUrl: './ticket-view.component.html',
  styles: []
})
export class TicketViewComponent implements OnInit {

  public vm: any = {};
  public title = 'Información de Prioridad';
  public cargando = true;
  public listaTicketsEstado: any[] = [];
  public ticketStatus = TicketEstadoEnum;

  public estadoDescripcion = '';
  public estadoColor = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private location: Location
  ) { }

  ngOnInit() {
    this.buscarInfo();
    this.llenarTicket();
  }

  private llenarTicket(): void {
    this.listaTicketsEstado = [
      { id: TicketEstadoEnum.Pending, descripcion: 'Pending', color: '#0149ad' },
      { id: TicketEstadoEnum.Open, descripcion: 'Open', color: '#00b300' },
      { id: TicketEstadoEnum.Concluded, descripcion: 'Concluded', color: '#009900' },
      { id: TicketEstadoEnum.OnHold, descripcion: 'On Hold', color: '#7575a3' },
      { id: TicketEstadoEnum.Cancelled, descripcion: 'Cancelled', color: '#808080' }
    ];
  }

  private obtenerColorActual(): void {
    const estado = this.listaTicketsEstado.find(o => o.id === NumberHelper.getNum(this.vm.ticketEstadoId));
    if (estado) {
      this.estadoColor = estado.color;
      this.estadoDescripcion = estado.descripcion;
    }
  }

  private buscarInfo(): void {
    const id = NumberHelper.getNum(this.route.snapshot.params['id']);

    if (id === 0) {
      AlertasHelper.show('The Id Is Invalid.', null, () => { this.volverAtras(); });
    }

    this.ticketService
      .getInfo(id)
      .subscribe(value => {
        this.vm = value;
        this.cargando = false;
        this.obtenerColorActual();
      }, (error: Response) => {
        AlertasHelper.showError(error);
        this.cargando = false;
      });
  }

  public volverAtras(): void {
    this.location.back();
  }

  public verEmpleado(id: number): void {
    this.router.navigateByUrl(`generales/empleado/${id}/view`);
  }

  public editarEntrada(ticketEntradaId: number) {
    if (this.vm.ticketEstadoId === TicketEstadoEnum.Cancelled) {
      AlertasHelper.show('This ticket is cancelled you can not edit the entries');
      return;
    }

    if (this.vm.ticketEstadoId === TicketEstadoEnum.Concluded) {
      AlertasHelper.show('This ticket is cancelled you can not edit the entries');
      return;
    }

    // [routerLink]="[item.ticketEntradaId, 'entry']"

    this.router.navigate([`${ticketEntradaId}/entry`], { relativeTo: this.route });
  }

}
