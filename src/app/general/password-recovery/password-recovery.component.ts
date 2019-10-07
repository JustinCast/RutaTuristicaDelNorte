import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  recoveryFG: FormGroup;
  constructor(private _fb: FormBuilder) { 
    this.recoveryFG = this._fb.group({
      'username': ['', Validators.required],
      'code': ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    
  }

}
