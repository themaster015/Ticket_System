import { Injectable } from '@angular/core';

import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class Md5Service {

  generarHashStr(value: string): string | Int32Array {
    return Md5.hashStr(value);
  }
}
