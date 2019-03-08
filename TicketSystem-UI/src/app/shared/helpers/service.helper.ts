import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';


@Injectable()
export class ServiceHelper {

    public static handleError(error: any) {
        if (error instanceof Response) {
          if (error.status === 400) {
            return throwError(error.json()['error'] || 'El registro no fue encontrado.');
          } else if (error.status === 404) {
            return throwError(error.json()['error'] || 'El registro no fue encontrado.');
          } else if (error.status === 500) {
            return throwError(error.json()['error'] || 'Se se pudo realizar la comunicación con el servidor.');
          }

          return throwError(error.json()['error'] || 'Se ha producido un error en el servidor');
        }

        return throwError(error || 'Se ha producido un error en el servidor');
    }

    public static obtenerHttpHeader(): HttpHeaders {
        return new HttpHeaders({ 'Content-Type': 'application/json' });
    }

    // public static obtenerParametrosPaginacionItemSelect(
    //     query: string,
    //     filtros: any [],
    //     pagina: number,
    //     tamanoPagina: number,
    //     elementoId?: number
    // ): HttpParams {

    //     let params = new HttpParams()
    //       .set('paginacion.cantidadElementoPagina', `${tamanoPagina}`)
    //       .set('paginacion.paginaActual', `${pagina}`)
    //       .set('orden.campo', 'descripcion')
    //       .set('orden.orientacion', 'asc')
    //       .set('elementoId', `${NumberHelper.obtenerValorNumerico(elementoId)}`);

    //     if (query) {
    //       params = params.append('filtro.filtroGeneral', query);
    //     }

    //     if (filtros !== undefined && filtros !== null && filtros.length > 0) {
    //       filtros.forEach((value: any) => {
    //         params = params.append('filtro.' + value.criterio, value.valor);
    //       });
    //     }

    //     return params;
    // }

    // public static obtenerParametrosPaginacionIndex(obj: ITablaParametro): HttpParams {

    //     let params = new HttpParams()
    //       .set('paginacion.cantidadElementoPagina', `${obj.paginacion.cantidadElementoPagina}`)
    //       .set('paginacion.paginaActual', `${obj.paginacion.paginaActual}`)
    //       .set('orden.campo', obj.orden.campo)
    //       .set('orden.orientacion', obj.orden.orientacion);

    //     if (obj.filtro !== undefined && obj.filtro !== null && obj.filtro.length > 0) {

    //       obj.filtro.forEach((value: any, index: number, lista: any[]) => {
    //         params = params.append('filtro.' + value.criterio, value.valor);
    //       });
    //     }

    //     return params;
    // }
}
