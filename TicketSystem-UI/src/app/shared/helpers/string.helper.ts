import { Injectable } from '@angular/core';

@Injectable()
export class StringHelper {

  public static replaceAll(texto: string, valor: string, nuevoValor: string) {
    while (texto.indexOf(valor) >= 0) {
      texto = texto.replace(valor, nuevoValor);
    }

    return texto;
  }

  public static getStringValue(texto: any): string {
    if (texto === undefined || texto === null) {
      return '';
    }

    return texto;
  }

  public static textIsValid(texto: any): boolean {
    if (texto === undefined || texto === null || texto === '') {
      return false;
    }

    return true;
  }
}
