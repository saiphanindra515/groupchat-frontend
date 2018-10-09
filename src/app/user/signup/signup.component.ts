import { Component, OnInit } from '@angular/core';
import { HttpserveService } from '../../httpserve.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
   public firstName;
   public lastName;
   public email;
   public password;
   public loading=false;
   public mobileNumber;
   public response;
  constructor(public httpservice:HttpserveService,public toastr:ToastrService,public router:Router) { }

  ngOnInit() {
  }
   
  public signup=()=>{
    this.loading=true;
    if(this.firstName==undefined){
     this.toastr.error('first name is mandatory!');
    }else if(this.lastName==undefined){
      this.toastr.error('last name is mandatory!');
    }else if(this.email==undefined){
      this.toastr.error('email is mandatory!');
    }else if(this.mobileNumber==undefined){
      this.toastr.error('mobile number is mandatory!');
    }
    let data = {
      firstName :this.firstName,
      lastName:this.lastName,
      email:this.email,
      password:this.password,
      
      mobileNumber:this.mobileNumber
    }
    console.log(data);
   this.httpservice.signupcall(data).subscribe(
     data=>{
       this.response=data;
       console.log(this.response);
       this.loading=false;
       if(this.response.error==false){
       this.toastr.success('succesfully created,please login');

       setTimeout(()=>{
        this.router.navigate(['/login']);
       },3000);
       
       
      
       }else{
         this.toastr.error(this.response.message);
       }
     },
     err=>{
       this.loading=false;
       console.log(err);
       this.toastr.error('user is not created');
     }
   )
  }

}
