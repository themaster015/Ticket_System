import { Component, OnInit } from '@angular/core';
import { maskCedula } from 'src/app/shared/constantes/formato-mask';
import { Empleado } from '../shared/empleado.model';
import { NumberHelper } from 'src/app/shared/helpers/number-helper';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { EmpleadoService } from '../shared/empleado.service';
import { AlertasHelper } from 'src/app/shared/helpers/alertas.helper';
import { FormGroup } from '@angular/forms';
import { StringHelper } from 'src/app/shared/helpers/string.helper';

@Component({
  selector: 'tmts-empleado-form',
  templateUrl: './empleado-form.component.html',
  styles: []
})
export class EmpleadoFormComponent implements OnInit {

  public maskCedula = maskCedula;
  public vm: Empleado;

  public listaSexo = [
    { id: 'F', descripcion: 'Femele' },
    { id: 'M', descripcion: 'Male' }
  ];

  constructor(
    private empleadoService: EmpleadoService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.buscarDatos();
  }

  private buscarDatos(): void {
    const id = NumberHelper.getNum(this.route.snapshot.params['id']);

    let servicio: Observable<Empleado>;
    if (id === 0) {
      servicio = this.empleadoService.getNuevo();
    } else {
      servicio = this.empleadoService.getById(id);
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
      this.empleadoService
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

    if (this.vm.nombre === '') {
      AlertasHelper.show(`You must specify the employee's name`);
      return false;
    }

    if (this.vm.apellido === '') {
      AlertasHelper.show(`You must specify the employee's Last Name`);
      return false;
    }

    let cedula = StringHelper.replaceAll(this.vm.cedula, '-', '');
    cedula = StringHelper.replaceAll(this.vm.cedula, '_', '');

    if (cedula === '') {
      AlertasHelper.show(`You must specify the employee's Id`);
      return false;
    }

    if (cedula.length < 13) {
      AlertasHelper.show(`The Id's length is incorrect`);
      return false;
    }

    if (this.vm.email === '') {
      AlertasHelper.show(`You must specify the employee's email`);
      return false;
    }

    if (this.vm.sexo === '') {
      AlertasHelper.show(`You must specify the employee's gender`);
      return false;
    }

    return true;
  }

}
