import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";
import { 
  MatTabsModule,
  MatListModule,
  MatExpansionModule,
  MatIconModule,
  MatCardModule
 } from "@angular/material";
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTabsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBnL99luFHHmlcJXiPg1qYDYg8SZeblVpM'
    }),
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    NgbCarouselModule
  ],
  exports: [
    MatTabsModule,
    AgmCoreModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    NgbCarouselModule
  ]
})
export class SharedModule { }
