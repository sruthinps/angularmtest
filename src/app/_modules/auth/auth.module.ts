import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { authRoutingComponents, AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';


@NgModule({
  declarations: [authRoutingComponents],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgOtpInputModule
  ]
})
export class AuthModule { }
