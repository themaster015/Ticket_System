import { Component, OnInit, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'tmts-validacion-error',
  templateUrl: './validacion-error.component.html',
  styles: []
})
export class ValidacionErrorComponent implements OnInit {
  @Input() campo: NgModel;
  @Input() isSubmitted = false;

  constructor() { }

  ngOnInit() {
  }

}
