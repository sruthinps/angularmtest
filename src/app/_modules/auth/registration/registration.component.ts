import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { signUpDto } from 'src/app/dto/sign-up.dto';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthDto } from 'src/app/dto/auth.dto';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  user: AuthDto = new AuthDto();

  signUpUser: signUpDto;
  registerForm: FormGroup;
  loading: boolean = false;
  userPassword = { pass: "", confpass: "" };
  error: string = '';
  jobroleList: any[] = [];

  constructor(
    private _authService: AuthService,
    private formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.meteData();
  }

  async ngOnInit(): Promise<void> {

    this.signUpUser = new signUpDto();

    this.user.username = environment.authUserName;
    this.user.password = environment.authPassword;
    await this._authService.Login(this.user).then((res) => {
      if (res.success == true) {
        localStorage.setItem('authtoken', res.token);
      } else
        console.log("===something went wrong===");
    })

    this.user.token = localStorage.getItem("authtoken");
    this._authService.getRegistrationFields(this.user).then(res => {
      console.log("res", res);
    })
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      lastname: [''],
      password: ['', Validators.required],
      email: ['', Validators.required],
      confPass: ['', Validators.required],
      phone: ['', Validators.required],
      jobRole: ['', Validators.required],
      address: ['']
    });
  }
  // Validators.pattern('^[6-9][0-9]{9}$')
  // Validators.pattern('^[a-zA-Z]+$')

  meteData() {
    this.jobroleList = [
      { label: "Designer", value: 1 },
      { label: "Developer", value: 2 },
      { label: "Manager", value: 3 },
      { label: "Programmer", value: 4 },
      { label: "Administrator", value: 5 },
    ]
  }


  async preSave(): Promise<boolean> {

    if (!this.signUpUser.user_firstname || this.signUpUser.user_firstname == '') {
      this.error = "First Name Required"
      setTimeout(() => {
        this.error = "";
      },1500)
      return false
    }

    if (!this.signUpUser.job_role || this.signUpUser.job_role.toString() == '') {
      this.error = "Job Role Required"
      setTimeout(() => {
        this.error = "";
      },1500)
      return false
    }

    if (!this.signUpUser.email || this.signUpUser.email == '') {
      this.error = "Email Id Required"
      setTimeout(() => {
        this.error = "";
      },1500)
      return false
    }

    if (!this.signUpUser.user_phone || this.signUpUser.user_phone.toString().trim() == '') {
      this.error = "Phone Number Required"
      setTimeout(() => {
        this.error = "";
      },1500)
      return false
    }

   

    if (!this.userPassword.pass || this.userPassword.pass == '') {
      this.error = "Password Required"
      setTimeout(() => {
        this.error = "";
      },1500)
      return false
    }

    if (!this.userPassword.confpass || this.userPassword.confpass == '') {
      this.error = "Confirm Password Required"
      setTimeout(() => {
        this.error = "";
      },1500)
      return false
    }

    if (this.userPassword.pass != this.userPassword.confpass) {
      this.error = "Password and Confirm Password Do not Match"
      setTimeout(() => {
        this.error = "";
      },1500)
      return false;
    }

    return true;
  }

  async onSubmit() {

    if (!(await this.preSave())) {
      return;
    }

    this.loading = true;
    this.signUpUser.user_password = this.userPassword.pass;
    this.signUpUser.token = localStorage.getItem("authtoken");
    await this._authService.registerNewUser(this.signUpUser).then(res => {
      localStorage.setItem('email', this.signUpUser.email);
      localStorage.setItem('authtoken', this.signUpUser.token);
      console.log("registration success", res);
      if (res.success == true)
        this._router.navigate(["/dashboard/profile"])
    }, (err) => {
      this.loading = false;
      console.log("err", err);
    })
  }

  onChangeEmailId() {

  }

  genderChange(value: any) {
    console.log("gender", value)
    this.signUpUser.user_gender = value;
  }

}
