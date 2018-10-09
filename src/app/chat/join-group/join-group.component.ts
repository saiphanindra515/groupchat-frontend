import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { HttpserveService } from '../../httpserve.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.css']
})
export class JoinGroupComponent implements OnInit {
  public name;
  public memberId;
  public email;
  public groupId;
  public res;
  public memberName;
  constructor(public _route:ActivatedRoute,public httpservice:HttpserveService,public toastr:ToastrService) { }

  ngOnInit() {
    this.name= this._route.snapshot.paramMap.get('createdName');
    this.memberId=this._route.snapshot.paramMap.get('memberId');
    this.email=this._route.snapshot.paramMap.get('email');
    this.groupId = this._route.snapshot.paramMap.get('groupId');
    this.memberName=this._route.snapshot.paramMap.get('memberName');
  }
  public join(){
    console.log(this.groupId);
    this.httpservice.joinGroup(this.email,this.groupId,this.memberName).subscribe(
      data=>{
        console.log(data);
        this.res=data;
        this.toastr.info(this.res.message);
      },
      err=>{
        console.log(err);  
      }
    )
  }
}
