import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddServiceComponent } from './add-service/add-service.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [AddServiceComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AdminModule { }
