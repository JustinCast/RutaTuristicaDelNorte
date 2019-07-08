import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddServiceComponent } from './add-service/add-service.component';
import { SharedModule } from '../shared.module';
import { AdminRootComponent } from './admin-root.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './admin.routing';
import { DropzoneDirective } from './add-service/dropzone.directive';

@NgModule({
  declarations: [AddServiceComponent, AdminRootComponent, DropzoneDirective],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    AdminRootComponent
  ]
})
export class AdminModule { }
