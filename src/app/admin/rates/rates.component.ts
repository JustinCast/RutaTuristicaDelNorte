import { Component, OnInit, ViewEncapsulation, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormArray, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Rates } from "src/app/models/Rates";

@Component({
  selector: "app-rates",
  templateUrl: "./rates.component.html",
  styleUrls: ["./rates.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class RatesComponent implements OnInit {
  ratesFG: FormGroup;
  items: FormArray;
  constructor(
    @Inject(MAT_DIALOG_DATA) public rates: any,
    public dialogRef: MatDialogRef<RatesComponent>,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    console.log(this.rates)
    this.rates = this.rates.rates as Rates;
    this.ratesFG = this._fb.group({
      header1: [""],
      header2: ["Tarifa Neta"],
      items: this._fb.array([this.createItem(undefined, undefined)]),
      observations: [""],
    });

    this.items = this.ratesFG.get("items") as FormArray;
    this.setupPreIncludedRates();
  }

  setupPreIncludedRates() {
    if (this.rates.items) {
      for (let i = 0; i < this.rates.items.length; i++) {
        this.items.push(this.createItem(this.rates.items[i].v1, this.rates.items[i].v2));
      }
    }
  }

  onNoClick(): void {
    return this.dialogRef.close();
  }

  createItem(v1Value: any, v2Value: any): FormGroup {
    return this._fb.group({
      v1: [v1Value ? v1Value : "", Validators.required],
      v2: [v2Value ? v2Value : "", Validators.required],
    });
  }

  addItem(): void {
    this.items.push(this.createItem(undefined, undefined));
  }

  deleteItem(index) {
    this.items.removeAt(index);
  }

  onSubmit() {
    return this.dialogRef.close(this.ratesFG.value as Rates);
  }
}
