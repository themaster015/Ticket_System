import { Component, OnInit } from '@angular/core';
import { Empleado } from '../shared/empleado.model';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpleadoService } from '../shared/empleado.service';
import { AlertasHelper } from 'src/app/shared/helpers/alertas.helper';
import { PagerService } from 'src/app/shared/services/page.service';
import { NumberHelper } from 'src/app/shared/helpers/number-helper';
import { JsonHelper } from 'src/app/shared/helpers/json.helper';

@Component({
  selector: 'tmts-empleado-list',
  templateUrl: './empleado-list.component.html',
  styles: []
})
export class EmpleadoListComponent implements OnInit {
  public page = 1;
  public cantidadPagina = 70;
  public detalle: Empleado[] = [];
  public detalleOriginal: Empleado[] = [];
  public detallePresentacion: Empleado[] = [];
  public inputValue = '';
  public estaCargando = true;
  private pager: any = {};


  public listacantidadPagina = [10, 20, 35, 50, 75, 100];
  public cantidadPag = 10;

  public listaEstado = [
    {id: 0, descripcion: 'All'},
    {id: 1, descripcion: 'Active'},
    {id: 2, descripcion: 'Inactive'}
  ];

  public selectedEstado = 0;

   constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: EmpleadoService,
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
        this.detalleOriginal = JsonHelper.newObject(data);
        this.setPage(1);
        this.estaCargando = false;
      }, (error: Response) => {
        this.estaCargando = false;
        AlertasHelper.showError(error);
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


  public crearNuevo(): void {
    this.router.navigate(['0/form'], { relativeTo: this.route });
  }

  public agregarEmpleado(): void {
    this.router.navigate(['0/form'], { relativeTo: this.route });
  }

  protected activar(id: number, descripcion: string): void {

    if (id <= 0) {
      return;
    }

    AlertasHelper.confirmar(`Do you want to activate the employee ${descripcion}?`, 'Activate', () => {
      this.service
        .activar(id)
        .subscribe(() => {
          this.buscarDatos();
        }, (error: Response) => {
          AlertasHelper.showError(error);
        });
    });
  }

  protected inactivar(id: number, descripcion: string): void {

    if (id <= 0) {
      return;
    }

    AlertasHelper.confirmar(`Do you want to inactivate the employee ${descripcion}?`, 'Inactivate', () => {
      this.service
        .inactivar(id)
        .subscribe(() => {
          this.buscarDatos();
        }, (error: Response) => {
          AlertasHelper.showError(error);
        });
    });
  }

  public borrar(empleadoId: number, descripcion: string): void {
    AlertasHelper.confirmar(`Are you sure that you want to delete ${descripcion}?`, 'Delete', () => {

      this.service
      .delete(empleadoId)
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

  public cambiarEstado(): void {
    this.detalle = JsonHelper.newObject(this.detalleOriginal);

    if (NumberHelper.getNum(this.selectedEstado) > 0) {
      const estado = this.selectedEstado === 1 ? true : false;
      const lista = this.detalle.filter(o => o.estado === estado);
      this.detalle = JsonHelper.newObject(lista);
    }

    this.recargarPager();
  }

  public search(): void {
    this.detalle = JsonHelper.newObject(this.detalleOriginal);
    const texto = this.inputValue.toLowerCase();

    if (texto !== '') {
      const lista = this.detalle.filter(o =>
        o.nombre.toLowerCase().startsWith(texto) ||
        o.apellido.toLowerCase().startsWith(texto) ||
        o.cedula.toLowerCase().startsWith(texto) ||
        o.email.toLowerCase().startsWith(texto));
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

}
