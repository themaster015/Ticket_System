import { Component, OnInit, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'tmts-validacion',
  templateUrl: './validacion.component.html',
  styles: []
})
export class ValidacionComponent implements OnInit {
  @Input() campo: NgModel;
  @Input() isSubmitted = false;

  constructor() { }

  ngOnInit() {
  }

}
