import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertasHelper } from 'src/app/shared/helpers/alertas.helper';

@Component({
  selector: 'tmts-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cerrarCesion(): void {
    AlertasHelper.confirmar(`Are you sure?`, 'Log Out', () => {
      localStorage.removeItem('tmtsUserAutenticado');
      this.router.navigateByUrl('login');
    });
  }
}
