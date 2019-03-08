import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tmts-identificador',
  templateUrl: './identificador.component.html',
  styles: []
})
export class IdentificadorComponent implements OnInit {
  @Input() identificador: string;
  @Input() estado: string;

  constructor() { }

  ngOnInit() {
  }

}
