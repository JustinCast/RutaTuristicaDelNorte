import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
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
    MatCardModule
  ],
  exports: [
    MatTabsModule,
    AgmCoreModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule
  ]
})
export class SharedModule { }
