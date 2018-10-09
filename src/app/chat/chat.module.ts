import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatboxComponent } from './chatbox/chatbox.component';
import {RouterModule,Routes} from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { LoadingModule } from 'ngx-loading';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { JoinGroupComponent } from './join-group/join-group.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    RouterModule.forChild([
      {path:'chat',component:ChatboxComponent},
      {path:'joinGroup/:memberId/:createdName/:groupId/:email/:memberName',component:JoinGroupComponent}
    ])
  ],
  declarations: [ChatboxComponent, JoinGroupComponent]
})
export class ChatModule { }
