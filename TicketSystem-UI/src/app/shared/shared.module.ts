import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ValidacionComponent } from './componentes/validacion/validacion.component';
import { IdentificadorComponent } from './componentes/identificador/identificador.component';
import { ValidacionErrorComponent } from './componentes/validacion-error/validacion-error.component';
import { TextMaskModule } from 'angular2-text-mask';
import { PagerService } from './services/page.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { Md5Service } from './services/md5.service';

@NgModule({
  declarations: [
    ValidacionComponent,
    IdentificadorComponent,
    ValidacionErrorComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    TextMaskModule,
    NgSelectModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  exports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ValidacionComponent,
    IdentificadorComponent,
    ValidacionErrorComponent,
    TextMaskModule,
    NgSelectModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [
    PagerService,
    Md5Service
  ]

})
export class SharedModule { }
