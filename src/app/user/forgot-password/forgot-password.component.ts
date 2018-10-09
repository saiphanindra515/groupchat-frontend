import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { HttpserveService } from '../../httpserve.service';
import { ToastrComponentlessModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
   public newId;
   public password : string;
   public confirmPassword:string;
   public email;
   public res;
  constructor(public _router:ActivatedRoute,public http : HttpserveService,public toastr:ToastrService,public router:Router) { }

  ngOnInit() {
  this.newId=this._router.snapshot.paramMap.get('id');
  console.log(this.newId);
  }
  public check(){
    let obj={
      'email':this.email,
      'id':this.newId,
      'password':this.password,
      'confirm':this.confirmPassword
    }
    console.log(obj);
    if(this.password==this.confirmPassword){
      this.http.passwordSet(this.email,this.password,this.newId).subscribe(
        data=>{
          this.res=data;
          console.log(this.res);
          
                  
            this.toastr.success('password changed!');
            this.router.navigate(['/login']); 
          
            
        },
      err=>{
        this.toastr.error('sorry try again');
      }
      )
      
    }
    else{
     console.log('password not matched!');
    }
  }
  
}
