import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email:string;
  visibleOtp: boolean = false;
  showOtpComponent: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  sendOtp(){
    this.visibleOtp = true;
  }

  onOtpChange(otp:any) {
   console.log("Gets Otp Codes");
  }

  resendOtp(){
    console.log("Resends Otp Codes");
  }

  verifyOtp(){
    console.log("Verify Otp Codes");
  }

}
