import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { FormArray, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Rates } from 'src/app/models/Rates';

@Component({
  selector: "app-rates",
  templateUrl: "./rates.component.html",
  styleUrls: ["./rates.component.scss"],
  encapsulation: ViewEncapsulation.None 
})
export class RatesComponent implements OnInit {
  ratesFG: FormGroup;
  items: FormArray;
  constructor(
    public dialogRef: MatDialogRef<RatesComponent>,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.ratesFG = this._fb.group({
      header1: ["", Validators.required],
      header2: ["Tarifa Neta", Validators.required],
      items: this._fb.array([this.createItem()]),
      observations: ['']
    });
  }

  onNoClick(): void {
    return this.dialogRef.close();
  }

  createItem(): FormGroup {
    return this._fb.group({
      v1: ["", Validators.required],
      v2: ["", Validators.required]
    });
  }

  addItem(): void {
    this.items = this.ratesFG.get("items") as FormArray;
    this.items.push(this.createItem());
  }

  deleteItem(index) {
    this.items.removeAt(index);
  }

  onSubmit() {
    return this.dialogRef.close(this.ratesFG.value as Rates);
  }
}
