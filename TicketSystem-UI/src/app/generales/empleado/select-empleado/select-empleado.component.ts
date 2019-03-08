import { Component, OnInit, Output } from '@angular/core';
import { Empleado } from '../shared/empleado.model';
import { AlertasHelper } from 'src/app/shared/helpers/alertas.helper';
import { EmpleadoService } from '../shared/empleado.service';
import { EventEmitter } from '@angular/core';
import { NumberHelper } from 'src/app/shared/helpers/number-helper';

@Component({
  selector: 'tmts-select-empleado',
  templateUrl: './select-empleado.component.html',
  styles: []
})
export class SelectEmpleadoComponent implements OnInit {

  public listaEmpleado: Empleado[] = [];
  public listaEmpleadoBuffer: Empleado[] = [];
  public bufferSize = 50;
  public loading = true;
  public numberOfItemsFromEndBeforeFetchingMore = 10;
  public selectedEmpleado: any;
  public empleadoId = 0;

  @Output() enCambioEmpleado = new EventEmitter();

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit() {
    this.cargarEmpleados();
  }

  private cargarEmpleados(): void {
    this.empleadoService
      .getAll()
      .subscribe(data => {
        this.listaEmpleado = data;
        this.listaEmpleadoBuffer = this.listaEmpleado.slice(0, this.bufferSize);

        if (NumberHelper.getNum(this.empleadoId) > 0) {
          this.seleccionarEmpleado(this.empleadoId);
        }
        this.loading = false;

      }, (error: Response) => {
        AlertasHelper.showError(error);
        this.loading = false;
      });
  }

  onScrollToEnd() {
    this.fetchMore();
  }

  onScroll({ end }) {
    if (this.loading || this.listaEmpleado.length === this.listaEmpleadoBuffer.length) {
      return;
    }

    if (end + this.numberOfItemsFromEndBeforeFetchingMore >= this.listaEmpleadoBuffer.length) {
      this.fetchMore();
    }
  }

  public cambioEmpleado(event: Empleado): void {
    if (this.enCambioEmpleado.observers.length > 0) {
      this.enCambioEmpleado.emit(event);
    }
  }

  private fetchMore() {
    const len = this.listaEmpleadoBuffer.length;
    const more = this.listaEmpleado.slice(len, this.bufferSize + len);
    this.loading = true;

    this.loading = false;
    this.listaEmpleadoBuffer = this.listaEmpleadoBuffer.concat(more);
  }

  private seleccionarEmpleado(empleadoId: number): void {
    this.selectedEmpleado = this.listaEmpleado.find(o => o.empleadoId === empleadoId);
  }

  public asignarEmpleadoId(empleadoId: number): void {
    this.empleadoId = empleadoId;
  }
}
