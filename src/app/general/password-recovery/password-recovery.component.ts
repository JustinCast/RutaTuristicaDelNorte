import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-password-recovery",
  templateUrl: "./password-recovery.component.html",
  styleUrls: ["./password-recovery.component.scss"]
})
export class PasswordRecoveryComponent implements OnInit {
  recoveryFG: FormGroup;
  hide = true;
  hideConfirmPassword = true;
  constructor(private _fb: FormBuilder, private _user: UserService) {
    this.recoveryFG = this._fb.group({
      username: ["", Validators.required],
      code: ["", Validators.required],
      newPassword: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    let recoveryInfo = this.recoveryFG.value;
    console.log(recoveryInfo);
    //this._user.verifyCodeUsername();
  }
}
