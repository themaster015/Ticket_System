import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../ticket/shared/ticket.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PagerService } from 'src/app/shared/services/page.service';
import { JsonHelper } from 'src/app/shared/helpers/json.helper';
import { AlertasHelper } from 'src/app/shared/helpers/alertas.helper';
import { NumberHelper } from 'src/app/shared/helpers/number-helper';
import { TicketService } from '../shared/ticket.service';
import { TicketEstadoEnum } from 'src/app/shared/enums/general-enums';

@Component({
  selector: 'tmts-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  public page = 1;
  public cantidadPagina = 70;
  public detalle: any[] = [];
  public detalleOriginal: Ticket[] = [];
  public detallePresentacion: Ticket[] = [];
  public inputValue = '';
  public estaCargando = true;
  public vistaLista = false;
  public listacantidadPagina = [10, 20, 35, 50, 75, 100];
  public cantidadPag = 10;
  public ticketStatus = TicketEstadoEnum;

  public listaEstado = [
    {id: 0, descripcion: 'All'},
    {id: 1, descripcion: 'Pending'},
    {id: 2, descripcion: 'Open'},
    {id: 3, descripcion: 'Concluded'},
    {id: 4, descripcion: 'On Hold'},
    {id: 5, descripcion: 'Cancelled'}
  ];

  public selectedEstado = 0;

  private pager: any = {};


   constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: TicketService,
    private pagerService: PagerService
  ) { }

  ngOnInit() {
   this.buscarDatos();
  }

  private buscarDatos(): void {
    this.service
      .getAll()
      .subscribe(data => {
        this.detalle = JsonHelper.newObject(data);
        this.detalleOriginal = JsonHelper.newObject(this.detalle);
        this.setPage(1);
        this.estaCargando = false;
      }, (error: Response) => {
        AlertasHelper.showError(error);
        this.estaCargando = false;
      });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    this.pager = this.pagerService.getPager(this.detalle.length, page, this.cantidadPag);
    this.detallePresentacion = this.detalle.slice(this.pager.startIndex, this.pager.endIndex + 1);

    this.cantidadPagina = NumberHelper.getNum(this.pager.totalItems);
}

  public crearEntrada(item: Ticket) {
    if (item.ticketEstadoId === TicketEstadoEnum.Cancelled) {
      AlertasHelper.show('This ticket is cancelled you can not add more entries');
      return;
    }

    if (item.ticketEstadoId === TicketEstadoEnum.Concluded) {
      AlertasHelper.show('This ticket is cancelled you can not add more entries');
      return;
    }

    this.router.navigate([`${item.ticketId}/entry`], { relativeTo: this.route });
  }

  public crearNuevo(): void {
    this.router.navigate(['0/form'], { relativeTo: this.route });
  }

  public agregarTicket(): void {
    this.router.navigate(['0/form'], { relativeTo: this.route });
  }

  public borrar(ticketId: number, descripcion: string): void {
    AlertasHelper.confirmar(`Are you sure that you want to delete ${descripcion}?`, 'Delete', () => {

      this.service
      .delete(ticketId)
      .subscribe(() => {
        this.buscarDatos();
       }, (error: Response) => {
        AlertasHelper.showError(error);
       });
    });
  }

  public cambiarCantidadPagina(): void {
    this.page = 1;
    this.setPage(1);
  }

  public search(): void {
    this.detalle = JsonHelper.newObject(this.detalleOriginal);
    const texto = this.inputValue.toLowerCase();

    if (texto !== '') {
      const lista = this.detalle.filter(o =>
        o.tema.toLowerCase().startsWith(texto) ||
        o.descripcion.toLowerCase().startsWith(texto) ||
        o.empleadoNombre.toLowerCase().startsWith(texto));

      this.detalle = JsonHelper.newObject(lista);
    }

    this.recargarPager();
  }

  public cambiarEstado(): void {
    this.detalle = JsonHelper.newObject(this.detalleOriginal);

    if (NumberHelper.getNum(this.selectedEstado) > 0) {
      const lista = this.detalle.filter(o => o.ticketEstadoId === this.selectedEstado);
      this.detalle = JsonHelper.newObject(lista);
    }

    this.recargarPager();
  }

  private recargarPager(): void {
    this.page = 1;
    this.pager = {};
    this.setPage(1);
  }

  public cambiaPagina(page: any): void {
    this.setPage(page);
  }

  public cambiarVista(vistaLista: boolean) {
    this.vistaLista = vistaLista;
  }

}
