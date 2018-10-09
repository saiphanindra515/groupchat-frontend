import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { FirstCharComponent } from './first-char/first-char.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  declarations: [FirstCharComponent, UserDetailsComponent],
  exports:[
    FirstCharComponent,
    UserDetailsComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
