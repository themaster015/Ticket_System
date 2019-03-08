import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class DateHelper {

  public static obtenerFecha(model: any): Date | null {
    if (!this.esEstructuraFecha(model)) {
      return null;
    }

    return new Date(model.year, model.month, model.day);
  }

  public static esEstructuraFecha(arg: any): arg is NgbDateStruct {
    if (arg === null || arg === undefined) {
      return false;
    }

    if (arg.year !== undefined) {
      if (arg.year.toString().length < 4) {
        return false;
      }
    }

    return arg.year !== undefined;
  }

  public static convertirDateAEstructuraFecha(fecha: Date): NgbDateStruct {
    if (fecha === null) {
      return null;
    }

    return <NgbDateStruct> {
      day: fecha.getDate(),
      month: fecha.getMonth() + 1,
      year: fecha.getFullYear()
    };
  }

}
