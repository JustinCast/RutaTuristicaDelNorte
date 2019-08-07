import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.scss']
})
export class AddTourComponent implements OnInit {
  tourFG: FormGroup;
  phones = { phones: [] };

  constructor(private _fb: FormBuilder) { 
    this.tourFG = this._fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      phone: [''],
      email: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  addPhone(phone) {
    this.phones.phones.unshift(phone);
  }

  onSubmit() {
    console.log(this.tourFG.value);
  }

}
