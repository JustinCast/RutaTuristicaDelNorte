import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-login-dialog",
  templateUrl: "./login-dialog.component.html",
  styleUrls: ["./login-dialog.component.scss"]
})
export class LoginDialogComponent implements OnInit {
  loginFG: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private _fb: FormBuilder,
    private _user: UserService
  ) {}

  ngOnInit() {
    this.loginFG = this._fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onNoClick(): void {
    return this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.loginFG.value);
    this._user.login(this.loginFG.get('username').value, this.loginFG.get('password').value)
  }
}
