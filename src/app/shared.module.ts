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
  MatDialogModule,
  MatSnackBarModule,
  MatListModule,
  MatDividerModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatTabsModule,
  MatAutocompleteModule
} from "@angular/material";
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DeferLoadModule } from '@trademe/ng-defer-load';
import { OwlModule } from 'ngx-owl-carousel';

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
    MatExpansionModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule,
    MatListModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    DeferLoadModule,
    MatTabsModule,
    MatAutocompleteModule,
    OwlModule
  ],
  exports: [
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule,
    MatListModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    DeferLoadModule,
    MatTabsModule,
    MatAutocompleteModule,
    OwlModule
  ]
})
export class SharedModule {}
