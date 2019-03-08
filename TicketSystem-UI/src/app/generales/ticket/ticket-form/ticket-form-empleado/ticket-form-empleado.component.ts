import { Component, OnInit, Input, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { AlertasHelper } from 'src/app/shared/helpers/alertas.helper';
import { TicketEmpleado } from '../../shared/ticket-empleado.model';
import { NumberHelper } from 'src/app/shared/helpers/number-helper';
import { JsonHelper } from 'src/app/shared/helpers/json.helper';
import { SelectEmpleadoComponent } from 'src/app/generales/empleado/select-empleado/select-empleado.component';

@Component({
  selector: 'tmts-ticket-form-empleado',
  templateUrl: './ticket-form-empleado.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TicketFormEmpleadoComponent implements OnInit {

  @Input() detalle: TicketEmpleado[];
  @ViewChild('empleadoSelect') selectEmpleado: SelectEmpleadoComponent;

  public vm: TicketEmpleado;
  public empleadoElegido: TicketEmpleado;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }


  public agregarNuevo(): void {
    const enEdicion = this.detalle.find(o => o.estaEditando === true);

    if (enEdicion) {
      AlertasHelper.show('You must finish to edit the actual field to continue');
      return;
    }

    this.vm = new TicketEmpleado(0, 0, 0, '', true);
    this.detalle.push(this.vm);
  }

  public aceptarEdicion(item: any) {
    const index = this.getIndexActual(item);

    if (!this.validar(index)) {
      return;
    }

    this.completarEdicion(index);
  }

  public cancelarEdicion(item: any): void {
    const index = this.getIndexActual(item);

    if (this.empleadoElegido) {
      this.detalle[index] = this.empleadoElegido;
      this.detalle[index].estaEditando = false;
    } else {
      this.detalle.splice(index, 1);
    }
  }

  private completarEdicion(index: number) {
    this.empleadoElegido = null;
    this.detalle[index].estaEditando = false;
  }

  public cambioEmpleado(event) {
    this.vm.empleadoId = 0;
    this.vm.empleadoNombre = '';

    if (event) {
      this.vm.empleadoId = event.empleadoId;
      this.vm.empleadoNombre = event.nombreCompleto;
    }
  }

  public editarDetalle(item: TicketEmpleado): void {
    this.empleadoElegido = JsonHelper.newObject(item);
    this.vm = item;
    item.estaEditando = true;
    this.cd.detectChanges();
    this.selectEmpleado.asignarEmpleadoId(item.empleadoId);
  }

  public borrarDetalle(item: TicketEmpleado): void {
    if (item.ticketEmpleadoId > 0) {
      AlertasHelper.show(`The employee ${item.empleadoNombre} can't be deleted because it has relationship with tickets`);
      return;
    }

    this.detalle.splice(this.getIndexActual(item), 1);
  }

  private getIndexActual(item: TicketEmpleado): number {
    return this.detalle.indexOf(item);
  }

  private validar(index: number): boolean {

    if (NumberHelper.getNum(this.vm.empleadoId) <= 0) {
      AlertasHelper.show('Please specify the employee');
      return false;
    }

    const enEdicion = this.detalle.find(o => o.estaEditando === true && this.detalle.indexOf(o) !== index);

    if (enEdicion) {
      AlertasHelper.show('You must finish to edit the actual field to continue');
      return false;
    }

    for (const item of this.detalle) {
      if (!item.estaEditando) {
        if (item.empleadoId === this.vm.empleadoId) {
          AlertasHelper.show('The employee is already in the detail');
          return false;
        }
      }
    }

    return true;
  }
}
