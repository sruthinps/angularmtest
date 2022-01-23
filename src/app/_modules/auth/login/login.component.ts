import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  loading = false;
  submitted = false;
  error = '';
  user = { username: '', password: '' ,token: 'EAUWP13joU'};
  // user = { username: '', password: '',token: "EAUWP13joU" };

  constructor(
    private service: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    
  }

  async onSubmit() {
    this.service.Login(this.user).then(async res => {
      console.log("result", res);
      if(res.success == true){
      localStorage.setItem('authtoken', res.token);
      localStorage.setItem('email', this.user.username);
      await this.router.navigate(['dashboard']);
        this.user.password = '';
      }else {
        this.error = "Login Failed"
        setTimeout(() => {
          this.error = "";
        },1500)
      }
    }, (err) => {
      this.error = "Invalid Credentials"
      setTimeout(() => {
        this.error = "";
      },1500)
      console.log("=== here=err==", err);
      localStorage.setItem('authtoken', '');
    })
  }


}
