import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/User";
import { HttpErrorResponse } from "@angular/common/http";

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
      .subscribe({
        next: data => {
          if(!data.logged || data.logged === null) {
            this._user.openSnackBar("Credenciales incorrectas", "Ok", 2500);
            return;
          }
          this._auth.logout();
          console.log(data)
          this._auth.login(new User(data._fullname, this.loginFG.get("username").value, "", data._id));
          this._user.openSnackBar("Inicio de sesión exitoso", "Ok", 2500);
        },
        error: (err: HttpErrorResponse) =>
          this._user.openSnackBar("Error de inicio de sesión", "Ok", 2500)
      });
  }

  passwordRecovery() {
    this._user.passwordRecovery(this.loginFG.get("username").value).subscribe({
      next: () => this._user.openSnackBar("Email enviado", "Ok", 2500),
      error: (err: HttpErrorResponse) => this._user.handleError(err)
    });
  }
}
