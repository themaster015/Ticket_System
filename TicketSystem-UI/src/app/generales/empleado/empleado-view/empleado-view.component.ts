import { Component, OnInit } from '@angular/core';
import { NumberHelper } from 'src/app/shared/helpers/number-helper';
import { ActivatedRoute } from '@angular/router';
import { EmpleadoService } from '../shared/empleado.service';
import { AlertasHelper } from 'src/app/shared/helpers/alertas.helper';
import { Location } from '@angular/common';

@Component({
  selector: 'tmts-empleado-view',
  templateUrl: './empleado-view.component.html',
  styles: []
})
export class EmpleadoViewComponent implements OnInit {

  public vm: any = {};
  public title = 'Información de Prioridad';
  public cargando = true;
  public listaTicketsEstado: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private empleadoServicio: EmpleadoService,
    private location: Location
  ) { }

  ngOnInit() {
    this.buscarInfo();
    this.llenarTicket();
  }

  private llenarTicket(): void {
    this.listaTicketsEstado = [
      { descripcion: 'Pending', cantidad: 5, color: '#0149ad' },
      { descripcion: 'Open', cantidad: 2, color: '#00b300' },
      { descripcion: 'Concluded', cantidad: 45, color: '#009900' },
      { descripcion: 'On Hold', cantidad: 1, color: '#7575a3' },
      { descripcion: 'Cancelled', cantidad: 0, color: '#808080' }
    ];
  }
  private buscarInfo(): void {
    const id = NumberHelper.getNum(this.route.snapshot.params['id']);

    if (id === 0) {
      AlertasHelper.show('The Id Is Invalid.', null, () => { this.volverAtras(); });
    }

    this.empleadoServicio
      .getInfo(id)
      .subscribe(value => {
        this.vm = value;
        this.cargando = false;
      }, (error: Response) => {
        AlertasHelper.showError(error);
        this.cargando = false;
      });
  }

  public volverAtras(): void {
    this.location.back();
  }

}
