import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import { FormGroup } from '@angular/forms';

@Injectable()
export class AlertasHelper {

  public static confirmar(
    text: string,
    title?: string,
    siCallback?: () => void,
    noCallback?: () => void,
    cancelButtonText?: string,
    confirmButtonText?: string) {

    swal.fire({
      title: (title) ? title : 'Confirm',
      text: text,
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: (confirmButtonText) ? confirmButtonText : 'Yes',
      cancelButtonText: (cancelButtonText) ? cancelButtonText : 'No',
    }).then((result) => {
      if (result.value) {
        if (siCallback) {
          siCallback();
        }
      } else {
        if (noCallback) {
          noCallback();
        }
      }
    }).catch((reason: any) => this.handleError(reason));
  }

  public static show(text: string, title?: string, okCallBack?: () => void) {
    swal.fire(
      (title) ? title : 'Information', text, 'info').then(value => {
        if (okCallBack) {
          okCallBack();
        }
      }).catch((reason: any) => this.handleError(reason));
  }

  public static showError(error: Response, okCallBack?: () => void) {
    console.log(error);

    if (error.ok === true) {
      return;
    }

    let text = '';

    if (error.status === 400) {
      text = (<any>error).error;
    }

    if (error.status === 0) {
      text = 'The conection with the server was wrong';
    }

    if (text === '') {
      text = `Can't not make it a conection ` + error.statusText;
    }

    swal.fire('Validation message', text, 'warning')
      .then(value => {
        if (okCallBack) {
          okCallBack();
        }
      }).catch((reason: any) => this.handleError(reason));
  }

  public static confirmarPerdida(title?: string, text?: string, okCallback?: () => void) {

    swal.fire(
      (title) ? title : 'Warning',
      (text) ? text : 'You are goint to loose the making change, Do you want to continue?',
      'warning');

      swal.fire({
        title: (title) ? title : 'Confirm',
        text: (text) ? text : 'You are goint to loose the making change, Do you want to continue?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Continue',
        cancelButtonText: 'No, Stop',
      }).then((result) => {
        if (result.value) {
          console.log(result.value);
          if (okCallback) {
            okCallback();
          }
        }
      }).catch((reason: any) => this.handleError(reason));
  }

  public static showFormError(form: FormGroup) {
    swal.fire(
      'Information',
      'You must complete al required fields',
      'info'
      ).then(value => { })
      .catch((reason: any) => this.handleError(reason));
  }

  public static registroSucces(title?: string, text?: string, okCallBack?: () => void) {
    swal.fire(
      'Complete',
      'Data was registered correctly',
      'success'
      ).then(value => {
        if (okCallBack) {
          okCallBack();
        }
       })
      .catch((reason: any) => this.handleError(reason));
  }

  private static handleError(reason: any) {
    console.log('Error en AlertasHelper:');
    console.log(reason);
  }
}
