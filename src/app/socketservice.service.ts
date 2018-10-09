import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import {HttpClient,HttpHeaders} from '@angular/common/http';
import {HttpParams,HttpErrorResponse} from '@angular/common/http'
import {Observable} from 'rxjs';
 import {Cookie}  from 'ng2-cookies/ng2-cookies';
@Injectable({
  providedIn: 'root'
})
export class SocketserviceService {
   private url = "http://localhost:3000";
   private socket;
  constructor(public _http:HttpClient) {
    this.socket=io(this.url);
   }
   public verifyUser = () =>{
     return Observable.create((observer)=>{
       this.socket.on('verifyUser',(data)=>{
         console.log('i am in obs verify');
         observer.next(data);
       });
     });
   }
  public setuser:any=(authToken)=>{
    console.log('i am in obs setusr');
      this.socket.emit('set-user',authToken);
     
  }
  public onlineuser:any = ()=>{
    return Observable.create((Observer)=>{
      this.socket.on('online-users-list',(result)=>{
        console.log('i am in obs onlineuserlist');
        Observer.next(result);
      
        
      });
    });
  }
  //receiving messages from server
  public userid = (id)=>{
    return Observable.create((observer)=>{
      this.socket.on(id,(data)=>{
        observer.next(data);
      })
    })
  }
  // sending chat
  public sendchatmsg=(chatObj)=>{
    this.socket.emit('chat-msg',chatObj);
  }
   public markChatAsSeen = (chatinfo)=>{
     this.socket.emit('mark-chat-as-seen',chatinfo);
   }
    
    public getchat=(senderId,receiverId,skip):any=>{
      return this._http.get(`${this.url}/api/v1/chat/get/for/user?senderId=${senderId}&receiverId=${receiverId}&skip=${skip}&authToken=${Cookie.get('authToken')}`);
    }
  public exit(){
    this.socket.disconnect();
  }
  public sendGroupChat=(chatobj)=>{
   this.socket.emit('group-chat',chatobj); 
  }
  public groupchat=(id)=>{
    return Observable.create((observer)=>{
      this.socket.on(id,(data)=>{
        observer.next(data);
      })
    })
  }

  public saveGroupChat(obj){
    this.socket.emit('save-grp-chat',obj);
  }
  public typing(obj){
    this.socket.emit('typing',obj);
  }

  }
