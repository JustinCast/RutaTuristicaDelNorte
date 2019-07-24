import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { FormArray, FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-rates",
  templateUrl: "./rates.component.html",
  styleUrls: ["./rates.component.scss"]
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
      header2: ["", Validators.required],
      value1: ["", Validators.required],
      value2: ["", Validators.required],
      items: this._fb.array([this.createItem()])
    });
  }

  onNoClick(): void {
    return this.dialogRef.close();
  }

  createItem(): FormGroup {
    return this._fb.group({
      v1: "",
      v2: ""
    });
  }

  addItem(): void {
    this.items = this.ratesFG.get("items") as FormArray;
    this.items.push(this.createItem());
  }

  addRow() {
    // Find a <table> element with id="myTable":
    let cellCode = `<mat-form-field>
                      <input matInput type="text" placeholder="Inserte un valor" />
                    </mat-form-field>`;
    var table = document.getElementById("rates");

    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = table.insertRow(-1);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    // Add some text to the new cells:
    cell1.innerHTML = cellCode;
    cell2.innerHTML = cellCode;
  }
}
