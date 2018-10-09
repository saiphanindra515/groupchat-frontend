import { Injectable } from '@angular/core';
import {HttpHeaders,HttpParams} from '@angular/common/http';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import { AbstractFormGroupDirective } from '@angular/forms';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@Injectable({
  providedIn: 'root'
})
export class HttpserveService {
   public BaseUrl="http://localhost:3000/api/v1/users/";

   public setLocalStorage (data){
     localStorage.setItem('userInfo',JSON.stringify(data));
   }
   public getLocalStorage () : any {
     return JSON.parse(localStorage.getItem('userInfo'));
   }

  constructor(public http:HttpClient) { }
  public signupcall(data):any{
     const params = new HttpParams()
     .set('firstName',data.firstName)
     .set('lastName',data.lastName)
     .set('email',data.email)
     .set('mobileNumber',data.mobileNumber)
     .set('password',data.password)
     

     return this.http.post(this.BaseUrl+'signup',params);
  }
  
  public logincall(logindata):any{
    const loginparams = new HttpParams()
    .set('email',logindata.email)
    .set('password',logindata.password)

    return this.http.post(this.BaseUrl+'login',loginparams);
  }
  public logout (data):any{
     const params = new HttpParams()
     .set('userId',data)
     return this.http.post(`${this.BaseUrl}logout`,params);
  }
  public forgot(mail){
    const param = new HttpParams()
    .set('email',mail)
    return this.http.post(`${this.BaseUrl}forgotPassword`,param);
  }
  public passwordSet(mail,password,id){
   const param = new HttpParams()
   .set('id',id)
   .set('email',mail)
   .set('password',password)
   return this.http.post(`${this.BaseUrl}changePassword`,param);
  }
public getall=()=>{
  return this.http.get(`${this.BaseUrl}findall`);
}
public createGroup(name,mail,mname)
{
  const params = new HttpParams()
  .set('GroupName',name)
   .set('email',mail)
   .set('memberName',mname)
  return this.http.post(`${this.BaseUrl}createGroup`,params)
}
public invitefriends = (username,memberId,memberemail,groupName,groupId,fname)=>{
const params = new HttpParams()
.set('userId',memberId)
.set('email',memberemail)
.set('groupName',groupName)
.set('groupId',groupId)
.set('name',username)
.set('memberName',fname)
return this.http.post(`${this.BaseUrl}sendInvitation`,params);
}
public joinGroup =(email,groupId,member)=>{
  const params = new HttpParams()
  .set('email',email)
  .set('groupId',groupId)
  .set('memberName',member)
  
  return this.http.post(`${this.BaseUrl}joinGroup`,params);
}
public getAllGroups(email){
  const params=new HttpParams()
  .set('email',email)
 return this.http.post(`${this.BaseUrl}getGroups`,params)
}
public getPreviousGroupChat=(groupId,skip)=>{
  return this.http.get(`${this.BaseUrl}getGroupChat?skip=${skip}&groupId=${groupId}`);
}
public getGroupMem=(id)=>{
  const params = new HttpParams()
  .set('groupId',id)
  return this.http.post(`${this.BaseUrl}getMembersOfGroup`,params)
}
public editGroupName(id,name){
  const params = new HttpParams()
  .set('groupId',id)
  .set('groupName',name)
  return this.http.put(`${this.BaseUrl}editGroupName`,params)
}
public deleteGroup(id){
const params = new HttpParams()
.set('groupId',id)
return this.http.post(`${this.BaseUrl}deleteGroup`,params);
}
public leaveGroup(id,email){
  const params = new HttpParams()
  .set('groupId',id)
  .set('email',email)
  return this.http.post(`${this.BaseUrl}leaveGroup`,params);
}
public deleteaccount(email,id){
  const params = new HttpParams()
  .set('email',email)
  .set('id',id)
  return this.http.post(`${this.BaseUrl}deleteAccount`,params)
}
public deletegrpaccount(email){
  const params = new HttpParams()
  .set('email',email)
  return this.http.post(`${this.BaseUrl}deleteusergroups`,params)
}
}
