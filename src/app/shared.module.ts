import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule,
  MatOptionModule,
  MatCardModule,
  MatPaginatorModule
} from "@angular/material";

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
    MatPaginatorModule
  ],
  exports: [
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatPaginatorModule
  ]
})
export class SharedModule {}
