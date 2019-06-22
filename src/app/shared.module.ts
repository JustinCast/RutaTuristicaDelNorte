import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatInputModule,
  MatExpansionModule,
  MatCardModule,
  MatPaginatorModule
} from "@angular/material";
import {CarouselModule} from "ngx-carousel-lib";

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
    MatPaginatorModule,
    CarouselModule,
    MatExpansionModule
  ],
  exports: [
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatPaginatorModule,
    CarouselModule,
    MatExpansionModule
  ]
})
export class SharedModule {}
