import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    // private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    const usuario = localStorage.getItem('tmtsUserAutenticado');

    if (!usuario) {
      this.router.navigate(['login'], { relativeTo: this.route });
      return false;
    }

    return true;
    //   if (this.authService.estaAutenticado()) {
    //     console.log('Esta autenticado.');
    //     return true;
    //   }

    //   this.authService.iniciarSesion()
    //     .then(() => {
    //       console.log('Retornando estaAutenticado.');
    //       return this.authService.estaAutenticado();
    //     })
    //     .catch(reason => {
    //       console.log('Error autenticando. No se pudo autenticar con el servidor, verifique que el server se esté ejecutando..');
    //       this.router.navigate(['maintenance/offline-ui'], { relativeTo: this.route });
    //       return false;
    //     });
    // }
  }
}
