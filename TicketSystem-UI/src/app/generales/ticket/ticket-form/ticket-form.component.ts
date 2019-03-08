import { Component, OnInit } from '@angular/core';
import { Ticket } from '../shared/ticket.model';
import { TicketService } from '../shared/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { NumberHelper } from 'src/app/shared/helpers/number-helper';
import { Observable } from 'rxjs';
import { AlertasHelper } from 'src/app/shared/helpers/alertas.helper';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'tmts-ticket-form',
  templateUrl: './ticket-form.component.html',
  styles: []
})
export class TicketFormComponent implements OnInit {

  public vm: Ticket;

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.buscarDatos();
  }

  private buscarDatos(): void {
    const id = NumberHelper.getNum(this.route.snapshot.params['id']);

    let servicio: Observable<Ticket>;
    if (id === 0) {
      servicio = this.ticketService.getNuevo();
    } else {
      servicio = this.ticketService.getById(id);
    }

    servicio.subscribe(value => {
      this.vm = value;
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

    if (this.esValido()) {
      if (!form.valid) {
        AlertasHelper.showFormError(form);
        return;
      }
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

  private esValido(): boolean {

    if (this.vm.tema === '') {
      AlertasHelper.show(`You must specify the ticket's Subject`);
      return false;
    }

    if (this.vm.descripcion === '') {
      AlertasHelper.show(`You must specify the ticket's Description`);
      return false;
    }

    if (this.vm.listaEmpleado === null || this.vm.listaEmpleado.length <= 0) {
      AlertasHelper.show(`You must specify at least one employee for the ticket`);
      return false;
    }

    const enEdicion = this.vm.listaEmpleado.find(o => o.estaEditando === true);

    if (enEdicion) {
      AlertasHelper.show('You must finish to edit the actual field of employee to continue');
      return false;
    }

    return true;
  }


}
