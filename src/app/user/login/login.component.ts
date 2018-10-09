import { Component, OnInit } from '@angular/core';
import { HttpserveService } from '../../httpserve.service';
import{ActivatedRoute,Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cookie }  from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public email;
  public password;
  public response;
  public Forgotmail;
  public apires;
  public loading:boolean;
  constructor(public httpservice:HttpserveService,public router:Router,public toastr:ToastrService) { }

  ngOnInit() {
    this.loading=false;
    Cookie.deleteAll();
  }

  public login(){
    this.loading=true;
    if(this.email==undefined||this.email==" "||this.email==null){
      this.loading=false;
       this.toastr.error('please enter valid details');
    }else if(this.password==undefined||this.password==" "||this.password==null){
      this.loading=false;
       this.toastr.error('please enter valid details');
    }
    else{
    let logindata ={
      email:this.email,
      password:this.password
    }
    console.log(logindata);
      this.httpservice.logincall(logindata).subscribe(
        data=>{
          this.response=data;
          console.log(this.response);
          this.loading=false;
          this.toastr.success('successfully logged in');
          this.router.navigate(['/chat']);
          Cookie.set('authToken',this.response.data.token);
         // Cookie.set('receiverName',this.response.data.userDetails.firstName);
          //Cookie.set('receiverId',this.response.data.userDetails.userId);
          this.httpservice.setLocalStorage(this.response.data.userdetails);
        },
        err=>{
          this.loading=false;
          console.log(err);
          this.toastr.error('password incorrect');
        }
      )
    }
  }
  public forgotPassword(){
    if(!this.Forgotmail){
      this.toastr.warning('mention email Id');
    }else{
      this.loading=true;
      this.httpservice.forgot(this.Forgotmail).subscribe(
      
        data=>{
          this.apires=data;
          this.loading=false;
          console.log(this.apires);
          if(this.apires.status==400){
            this.toastr.success('email sent successfully');
          }else{
            this.loading=false;
            this.toastr.warning('try after some time!')
          }
        }
        
      
    )
    }
  }

}
