import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Usuario } from 'src/app/theme/login/shared/usuario.model';
import { NumberHelper } from 'src/app/shared/helpers/number-helper';
import { Observable } from 'rxjs';
import { AlertasHelper } from 'src/app/shared/helpers/alertas.helper';
import { FormGroup } from '@angular/forms';
import { Usuario2Service } from '../shared/usuario2.service';

@Component({
  selector: 'tmts-usuario-form',
  templateUrl: './usuario-form.component.html',
  styles: []
})
export class UsuarioFormComponent implements OnInit {

  public vm: Usuario;

  public listaAdmin = [
    { id: 1, descripcion: 'True' },
    { id: 0, descripcion: 'False' }
  ];

  constructor(
    private usuarioService: Usuario2Service,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.buscarDatos();
  }

  private buscarDatos(): void {
    const id = NumberHelper.getNum(this.route.snapshot.params['id']);

    let servicio: Observable<Usuario>;
    if (id === 0) {
      servicio = this.usuarioService.getNuevo();
    } else {
      servicio = this.usuarioService.getById(id);
    }

    servicio.subscribe(value => {
      this.vm = value;
    }, (error: Response) => {
      AlertasHelper.showError(error);
    });
  }

  public cancelar(formSinCambios: boolean): void {

    if (!formSinCambios) {
      AlertasHelper.confirmarPerdida(undefined, undefined, () => {
        this.location.back();
      });

      return;
    }

    this.location.back();
  }

  public registrar(form: FormGroup): void {

    if (this.esValido()) {
      if (!form.valid) {
        AlertasHelper.showFormError(form);
        return;
      }
      this.usuarioService
        .createOrEdit(this.vm)
        .subscribe(data => {
          AlertasHelper.registroSucces();
          this.location.back();
        }, (error: Response) => {
          AlertasHelper.showError(error);
        });
    }
  }

  private esValido(): boolean {

    if (this.vm.userName === '') {
      AlertasHelper.show(`You must specify the user's name`);
      return false;
    }

    if (this.vm.userPassword === '') {
      AlertasHelper.show(`You must specify the user's password`);
      return false;
    }

    if (this.vm.userPassword2 === '') {
      AlertasHelper.show(`You must specify the user's password confirmation`);
      return false;
    }

    if (this.vm.userPassword !== this.vm.userPassword2) {
      AlertasHelper.show(`The password Doesn't match`);
      return false;
    }

    return true;
  }
}
