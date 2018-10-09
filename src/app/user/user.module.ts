import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {RouterModule,Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingModule } from 'ngx-loading';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LoadingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild([
      {path:'signup',component:SignupComponent},
      {path:'forgot/:id',component:ForgotPasswordComponent}
    ])
  ],
  declarations: [LoginComponent, SignupComponent, ForgotPasswordComponent]
})
export class UserModule { }
