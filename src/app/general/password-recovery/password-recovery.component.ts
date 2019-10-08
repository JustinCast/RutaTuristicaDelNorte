import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { ErrorStateMatcher } from "src/app/models/ErrorStateMatcher";

@Component({
  selector: "app-password-recovery",
  templateUrl: "./password-recovery.component.html",
  styleUrls: ["./password-recovery.component.scss"]
})
export class PasswordRecoveryComponent implements OnInit {
  recoveryFG: FormGroup;
  hide = true;
  hideConfirmPassword = true;
  matcher = new ErrorStateMatcher();

  constructor(private _fb: FormBuilder, private _user: UserService) {
    this.recoveryFG = this._fb.group(
      {
        username: ["", Validators.required],
        code: ["", Validators.required],
        newPassword: ["", Validators.required],
        confirmPassword: ["", Validators.required]
      },
      { validators: this.checkPasswords }
    );
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.get("newPassword").value;
    let confirmPass = group.get("confirmPassword").value;
    if (String(pass).length > 0 && String(confirmPass).length > 0)
      return pass === confirmPass ? null : { notSame: true };
  }

  ngOnInit() {}

  onSubmit() {
    let recoveryInfo = this.recoveryFG.value;
    console.log(recoveryInfo);
    this._user.verifyCodeUsername(
      recoveryInfo.username,
      recoveryInfo.code,
      recoveryInfo.newPassword
    );
  }
}
