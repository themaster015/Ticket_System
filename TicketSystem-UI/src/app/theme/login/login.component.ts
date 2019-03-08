import { Component, OnInit } from '@angular/core';
import { Usuario } from './shared/usuario.model';
import { UsuarioService } from './shared/usuario.service';
import { Router } from '@angular/router';
import { AlertasHelper } from 'src/app/shared/helpers/alertas.helper';
import { NumberHelper } from 'src/app/shared/helpers/number-helper';
import { Md5Service } from 'src/app/shared/services/md5.service';

@Component({
  selector: 'tmts-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public imagePath = 'assets/images/face.png';

  public vm = new Usuario(0, '', '', 0, false, '', false);

  constructor(
    private usuarioServicio: UsuarioService,
    private router: Router,
    private md5Service: Md5Service
  ) { }

  ngOnInit() {
    localStorage.removeItem('tmtsUserAutenticado');
  }

  public login(): void {

    if (!this.validar()) {
      return;
    }

    const password = this.md5Service.generarHashStr(this.vm.userPassword);
    console.log(password.toString());

    this.usuarioServicio
      .iniciarSesion(this.vm.userName, password.toString())
      .subscribe((data: Usuario) => {

        if (NumberHelper.getNum(data.usuarioId) > 0) {
          localStorage.setItem('tmtsUserAutenticado', 'true');
          this.router.navigateByUrl('dashboard/default');
        } else {
          AlertasHelper.show('The username or password are incorrect');
        }

      }, (error: Response) => {
        AlertasHelper.showError(error);
      });
  }

  private validar(): boolean {

    if (this.vm.userName === '') {
      AlertasHelper.show('You must specify the User Name');
      return false;
    }

    if (this.vm.userPassword === '') {
      AlertasHelper.show('You must specify the User Password');
      return false;
    }

    return true;

  }

  public forgot(): void {
    AlertasHelper.show(`The System doesn't have support for this option`);
    return;
  }

}
