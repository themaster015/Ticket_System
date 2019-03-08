import { Component, OnInit, Input, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { TicketService } from '../../shared/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Ticket } from '../../shared/ticket.model';
import { NumberHelper } from 'src/app/shared/helpers/number-helper';
import { Observable } from 'rxjs';
import { AlertasHelper } from 'src/app/shared/helpers/alertas.helper';
import { FormGroup } from '@angular/forms';
import { SelectEmpleadoComponent } from 'src/app/generales/empleado/select-empleado/select-empleado.component';
import { TicketEntrada } from '../../shared/ticket-entrada.model';
import { TicketEstadoEnum } from 'src/app/shared/enums/general-enums';

@Component({
  selector: 'tmts-ticket-form-entry',
  templateUrl: './ticket-form-entry.component.html',
  styles: []
})
export class TicketFormEntryComponent implements OnInit, AfterViewInit {

  @ViewChild('empleadoSelect') selectEmpleado: SelectEmpleadoComponent;
  public vm: Ticket;
  public vmEntrada: TicketEntrada;
  public modelFechaInicio: any;
  public modelFechaFinal: any;

  public ticketStatus = TicketEstadoEnum;

  public listaEstado = [
    { id: 3, descripcion: 'Concluded' },
    { id: 4, descripcion: 'On Hold' },
    { id: 5, descripcion: 'Cancelled' }
  ];

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private location: Location,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.buscarDatos();
  }

  private buscarDatos(): void {
    const id = NumberHelper.getNum(this.route.snapshot.params['id']);
    const idEntry = NumberHelper.getNum(this.route.snapshot.params['idEntry']);

    let servicio: Observable<Ticket>;
    if (id === 0) {
      servicio = this.ticketService.getNuevo();
    } else {
      servicio = this.ticketService.getById(id);
    }

    servicio.subscribe(value => {
      this.vm = value;

      if (idEntry > 0) {
        this.vmEntrada = this.vm.ListaEntrada.find(o => o.ticketEntradaId === idEntry);
        this.tomarModelo();
      } else {
        this.vmEntrada = new TicketEntrada(0, 0, 0, null, null, '');
      }

    }, (error: Response) => {
      AlertasHelper.showError(error);
    });
  }

  public cancelar(formSinCambios: boolean): void {

    if (!formSinCambios) {
      AlertasHelper.confirmarPerdida(undefined, undefined, () => {
        this.location.back();
      });

      return;
    }

    this.location.back();
  }

  public registrar(form: FormGroup): void {

    this.asignarModelo();

    if (this.esValido()) {
      if (!form.valid) {
        AlertasHelper.showFormError(form);
        return;
      }

      this.vm.ListaEntrada.push(this.vmEntrada);

      this.ticketService
        .createOrEdit(this.vm)
        .subscribe(data => {
          AlertasHelper.registroSucces();
          this.location.back();
        }, (error: Response) => {
          AlertasHelper.showError(error);
        });
    }
  }

  private asignarModelo(): void {
    this.vmEntrada.fechaInicio = this.modelFechaInicio;
    this.vmEntrada.fechaFinal = this.modelFechaFinal;

    if (NumberHelper.getNum(this.vm.ticketEstadoId) === TicketEstadoEnum.Pending) {
      this.vm.ticketEstadoId = TicketEstadoEnum.Open;
      this.vm.ticketEstadoDescripcion = 'Open';
    }
  }

  private tomarModelo(): void {
    this.cd.detectChanges();
    this.selectEmpleado.asignarEmpleadoId(this.vmEntrada.empleadoId);

    this.modelFechaInicio = new Date(this.vmEntrada.fechaInicio);
    this.modelFechaFinal = new Date(this.vmEntrada.fechaFinal);
  }

  public cambioEmpleado(event) {
    this.vmEntrada.empleadoId = 0;

    if (event) {
      this.vmEntrada.empleadoId = event.empleadoId;
    }
  }

  private esValido(): boolean {

    if (NumberHelper.getNum(this.vmEntrada.empleadoId) <= 0) {
      AlertasHelper.show(`You must specify the ticket etry's Employee`);
      return false;
    }

    if (this.vmEntrada.fechaInicio === null) {
      AlertasHelper.show(`You must specify the ticket etry's Date Start`);
      return false;
    }

    if (this.vmEntrada.fechaFinal === null) {
      AlertasHelper.show(`You must specify the ticket etry's Date End`);
      return false;
    }

    if (this.vmEntrada.fechaFinal < this.vmEntrada.fechaInicio) {
      AlertasHelper.show(`The end date can't be fewer than Date Start`);
      return false;
    }

    if (this.vmEntrada.nota === '') {
      AlertasHelper.show(`You must specify the ticket etry's Nota`);
      return false;
    }

    return true;
  }

}
