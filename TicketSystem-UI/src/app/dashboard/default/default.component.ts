import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'tmts-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit, OnDestroy {

  public fecha = new Date();
  public subscribe: Subscription;

  constructor() { }

  ngOnInit() {
    this.actualizaHora();
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }


  private actualizaHora(): void {
    const source = interval(1000);
    this.subscribe =
      source.subscribe(val => {
        this.fecha = new Date();
      });
  }

}
