import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { SharedModule } from './shared/shared.module';

import{RouterModule,Routes} from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { HttpserveService } from './httpserve.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingModule } from 'ngx-loading';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { SocketserviceService } from './socketservice.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    ChatModule,
    SharedModule,
    BrowserAnimationsModule,
    LoadingModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path:'login',component:LoginComponent},
      {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'*',component:LoginComponent},
      {path:'**',component:LoginComponent}
    ])
  
  ],
  providers: [
    HttpClientModule,
    HttpserveService,
  SocketserviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
