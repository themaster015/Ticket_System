import { Injectable } from '@angular/core';

@Injectable()
export class NumberHelper {
  public static getNum(value): number {
    if (value === NaN || value === undefined || value === null) {
      return 0;
    }

    return +value;
  }
}
