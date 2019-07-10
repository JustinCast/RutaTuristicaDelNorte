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
  MatDialogModule
} from "@angular/material";
import { CarouselModule } from "ngx-carousel-lib";
import { NgxPaginationModule } from "ngx-pagination";
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
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
    NgxPaginationModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class SharedModule {}
