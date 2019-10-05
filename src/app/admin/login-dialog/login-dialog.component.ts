import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/User";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: "app-login-dialog",
  templateUrl: "./login-dialog.component.html",
  styleUrls: ["./login-dialog.component.scss"]
})
export class LoginDialogComponent implements OnInit {
  loginFG: FormGroup;
  password_recovery_flag = false;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private _fb: FormBuilder,
    private _user: UserService,
    private _auth: AuthService
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
    this._user
      .login(
        this.loginFG.get("username").value,
        this.loginFG.get("password").value
      )
      .subscribe(data => {
        this._auth.login(new User(data._fullname, data.logged, "", data._id));
        this._user.openSnackBar("Inicio de sesión exitoso", "Ok", 2500);
      });
  }

  passwordRecovery() {
    console.log(this.loginFG.get("username").value);
    this._user
      .passwordRecovery(this.loginFG.get("username").value)
      .subscribe({
        next: () => this._user.openSnackBar("Email enviado", "Ok", 2500),
        error: (err: HttpErrorResponse) => this._user.handleError(err)
      });
  }
}
