import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatInputModule,
  MatExpansionModule,
  MatCardModule
} from "@angular/material";
import { CarouselModule } from "ngx-carousel-lib";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    CarouselModule,
    MatExpansionModule,
    NgxPaginationModule
  ],
  exports: [
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    CarouselModule,
    MatExpansionModule,
    NgxPaginationModule
  ]
})
export class SharedModule {}
