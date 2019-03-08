import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceHelper } from '../helpers/service.helper';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export abstract class DataService<T> {
  protected headers: HttpHeaders;

  constructor(
    protected http: HttpClient,
    protected urlBase: string,
  ) {
    this.headers = ServiceHelper.obtenerHttpHeader();
  }

  public getAll(): Observable<any> {
    return this
      .http
      .get(this.urlBase, { headers: this.headers })
      .pipe(map(response => response))
      .pipe(catchError(error => ServiceHelper.handleError(error)));
  }

  public getById(id: number): Observable<T> {
    const url = `${this.urlBase}/${id}`;

    return this
      .http
      .get(url, { headers: this.headers })
      .pipe(map((response: any) => {
        return this.mapToObject(response);
      }))
      .pipe(catchError(error => ServiceHelper.handleError(error)));
  }

  public getInfo(id: number): Observable<any> {
    const url = `${this.urlBase}/${id}/info`;

    return this
      .http
      .get(url, { headers: this.headers })
      .pipe(map((response: any) => response.value))
      .pipe(catchError(error => ServiceHelper.handleError(error)));
  }

  public getNuevo(): Observable<T> {
    const url = `${this.urlBase}/nuevo`;

    return this
      .http
      .get(url, { headers: this.headers })
      .pipe(map((response: any) => {
        return this.mapToObject(response);
      }))
      .pipe(catchError(error => ServiceHelper.handleError(error)));
  }

  public createOrEdit(vm: any): Observable<any> {
    return this
      .http
      .post(this.urlBase, JSON.stringify(vm), { headers: this.headers })
      .pipe(map(response => response))
      .pipe(catchError(error => ServiceHelper.handleError(error)));
  }

  public delete(id: number): Observable<any> {
    const url = `${this.urlBase}/${id}`;

    return this
      .http
      .delete(url, { headers: this.headers })
      .pipe(map(response => response))
      .pipe(catchError(error => ServiceHelper.handleError(error)));
  }

  public activar(id: number): Observable<any> {
    const url = `${this.urlBase}/activar/${id}`;

    return this.http
      .post(url, '', { headers: this.headers })
      .pipe(map(response => response))
      .pipe(catchError(error => ServiceHelper.handleError(error)));
  }

  public inactivar(id: number): Observable<any> {
    const url = `${this.urlBase}/inactivar/${id}`;

    return this.http
      .post(url, '', { headers: this.headers })
      .pipe(map(response => response))
      .pipe(catchError(error => ServiceHelper.handleError(error)));
  }

  protected abstract mapToObject(response: any): T;

  protected ceroToNull(value: number | null): number | null {
    if (value !== null && value !== undefined && value === 0) {
      return null;
    }
    return value;
  }

  protected toDate(value: any): Date | null {
    if (value !== null && value !== undefined) {
      return new Date(value);
    }

    return null;
  }
}
