import { Component, OnInit,ViewContainerRef,ViewChild ,ElementRef } from '@angular/core';
import { SocketserviceService } from '../../socketservice.service';
import { HttpserveService } from '../../httpserve.service';
import {Router} from '@angular/router';
import {Cookie} from "ng2-cookies/ng2-cookies";
import { ToastrService } from 'ngx-toastr';
import { identifierModuleUrl } from '@angular/compiler';
import { identity } from 'rxjs';
declare var jquery : any;
declare var $ : any;      
@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css'],
  providers : [SocketserviceService]
})
export class ChatboxComponent implements OnInit {
  @ViewChild('scrollMe',{read:ElementRef})
  public scrollMe : ElementRef;
  public addedToGroup=[];
  public receiverName; 
  public chatting;
  public userInformation;
  public userName;
  public active;
  public messageText;
  public messageList=[];
  public userId;
  public usersList= [];
  public pageValue;
  public previousChat;
  public scrollToChatTop : boolean = false;
  public allUsers;
  public groupName;
  public group;
  public loading;
  public email;
  public res;
  
  public newGroupName;
  constructor(public httpservice:HttpserveService,
    public socketService:SocketserviceService,
    public router:Router,
    public toastr:ToastrService   
  ) { }
 
  ngOnInit() {
   
    this.check();
    this.verification();
    
    this.getonlineusers();
    this.groupchat=false;
     this.chatting=true;
    this.userInformation=this.httpservice.getLocalStorage();
    this.email=this.userInformation.email;
    this.userId=this.userInformation.userId;
    this.userName=`${this.userInformation.firstName} ${this.userInformation.lastName}`;
    
    this.getmessagefromuser();
    this.loading=false;
    console.log(this.userInformation.email);
    this.getGroups();
   
   }
 
  public check(){
    console.log('check');
    if(Cookie.get('authToken')==undefined||Cookie.get('authToken')==null||Cookie.get('authToken')==''){
       this.router.navigate(['/login']);
    }else{
       return;
    }

  }
  public verification:any=()=>{
    this.socketService.verifyUser().subscribe(
      (data)=>{
        
        this.setonlineuser();
      }
    )
    
  }
  public authToken = Cookie.get('authToken');
  public setonlineuser:any=()=>{
    //console.log('set online user');
    this.socketService.setuser(this.authToken);
    this.getonlineusers();
    
    
  
  }

  //typeeeeeeeeeeeeeeeeeee
  public type(){
    let typeobj={
      senderName : this.userName,
      listenId:this.active,
      senderId:this.userId
    }
    console.log(typeobj);
    this.socketService.typing(typeobj);
  }
  public getonlineusers : any =()=>{
    
  //  console.log('in get online user');
    
    this.socketService.onlineuser().subscribe(
    
      (result)=>{
          this.usersList=[];
      //  console.log(result);
         for(let x in result){
           let temp = {'Id':x,'userName':result[x],'chatting':false};
           this.usersList.push(temp);
           console.log(this.usersList);
         }
      },
      error=>{
        console.log('error at getonline');
      }
    )
  }
  public message
public sendMessageUsingEnter=(event:any)=>{
  if(event.keyCode==13){
    
    this.sendMessage();
  }
}
public grpmessageList=[];

  public sendMessage(){
     if(this.messageText){
       if(this.groupchat){
         let chatgrp={
           groupName:this.receiverName,
           groupId:this.active,
           senderName:this.userName,
           message:this.messageText,
           senderemail:this.userInformation.email,
           createdOn:new Date()
         }
         
         console.log('chat object'+chatgrp);
         this.messageText='';
         this.scrollToChatTop=false;
         this.socketService.sendGroupChat(chatgrp);
         this.socketService.saveGroupChat(chatgrp);

       }else{
    let chatobj = {
        senderId:this.userInformation.userId,
        senderName:this.userName,
        receiverId:Cookie.get('receiverId'),
        receiverName:Cookie.get('receiverName'),
        message:this.messageText,
        createdOn:new Date()
      }

      this.messageList.push(chatobj);
      this.socketService.sendchatmsg(chatobj);
      this.messageText='';
      this.scrollToChatTop=false;
    }
    }else{
      this.toastr.warning('cannot send empty message');
    }
}
  public userSelectedToChat = (id,name)=>{
     this.chatting=false;
     this.typing=false;
     this.grptyping=false;
     this.groupchat=false;
     this.active=id;
     this.receiverName=name;
     this.messageList=[];
     this.grpmessageList=[];
     this.pageValue=0;
     this.groupchat=false;
     console.log(id+"  "+name)
     Cookie.set('receiverId',id);

     Cookie.set('receiverName',name);
     this.getpreviouschat()
  }
  public getpreviouschat(){
    this.previousChat=(this.messageList.length>0)?this.messageList.slice():[];
    this.socketService.getchat(this.userInformation.userId,Cookie.get('receiverId'),this.pageValue*10).subscribe(
      (response)=>{
        if(response.status==200){
          this.messageList=response.data.concat(this.previousChat);

        }else{
          this.toastr.warning('no messages from this chat');
        }
      }
    )
    
  }
  public morechat(){
    if(this.groupchat){
      this.pageValue++;
      this.scrollToChatTop=true;
      this.getGroupChat();
    }else{
    this.pageValue++;
    this.scrollToChatTop=true;
    this.getpreviouschat();
    }
  }
  public typeCheck;
  public typing=false;
  public typerName;
  //geeeeeeeeeeeeee
  public getmessagefromuser : any =()=>{ 
    this.socketService.userid(this.userInformation.userId).subscribe(
      (data)=>{
         this.typeCheck=data;
         console.log(this.typeCheck);
         if(this.typeCheck.listenId){
           if(this.active==data.senderId){
             this.typing=true;
             this.typerName=this.typeCheck.senderName;
           }
         }else{
       // console.log(data);
       if(this.active==data.senderId){this.messageList.push(data)
         this.typing=false;
      };
      //  console.log(Cookie.get('receiverId'));
        //console.log(data.senderId);
        this.toastr.success(`${data.senderName} says : ${data.message}`);
         }
      }
    )
  }

  public logout(){
    Cookie.delete('receiverId');
    Cookie.delete('receiverName');
    Cookie.delete('authToken');
    Cookie.deleteAll();
    
    this.socketService.exit();
   
    
    this.router.navigate(['/login']);
  }
 // getting all users for creating group chat
  public getAllUsers(){
      
       this.httpservice.getall().subscribe(
         data=>{
            this.allUsers=data;
            console.log(this.allUsers);
         },
         err=>{
           console.log('unable to retrieve all users for group chat');
           console.log(err);
         }
       )
  }
  public addTogroup = (identity,username,email)=>{
    let temperory = {'id':identity,'fname':username,'email':email};
    this.addedToGroup.push(temperory);
    
  }
  public removeFromGroup = (id)=>{
   // console.log(id);
     let index = this.addedToGroup.map(function(a){return a.id}).indexOf(id);
     this.addedToGroup.splice(index,1); 
  }
  public createGroupfun(){
    if(this.groupName==undefined||this.groupName==null||this.groupName==" "){
       this.toastr.error('please enter groupname');
    }else{
      this.loading=true;
    this.httpservice.createGroup(this.groupName,this.userInformation.email).subscribe(
      data=>{
          console.log(data);
          this.loading=false;
           this.group=data;
           this.toastr.success('successful','group Created!');
           Cookie.set('groupId',this.group.data.groupId);
           console.log(this.addedToGroup);
            this.sendInvitation();
      },
      err=>{
           console.log(err);
           this.loading=false;
      }
    )
  }
  }
  public sendInvitation(){
    for(let user of this.addedToGroup){
      console.log(user);
      this.httpservice.invitefriends(`${this.userInformation.firstName}${this.userInformation.lastName}`,user.id,user.email,this.groupName,Cookie.get('groupId'),user.fname).subscribe(
        data=>{
          console.log(data);
        },err=>{
          console.log(err);
        }
      )

      
    }
    this.addedToGroup =[];

  }
  public allGroups;
  public groupdetails=[];
  public getGroups = ()=>{
    this.httpservice.getAllGroups(this.userInformation.email).subscribe(
      data=>{
             this.allGroups=data;
             console.log(data);
             for(let one of this.allGroups){
               let temp={'id':one.groupId,'name':one.groupName,'listening':false}
               this.groupdetails.push(temp);
             }
             console.log(this.allGroups);
             console.log(this.groupdetails);
      },
      err=>{
        console.log(err);
      }
    )
  }
  public groupchat;
  public groupSelectedToChat(id,name){
    this.active=id;
    this.typing=false;
    this.grptyping=false;
    this.receiverName=name;
    this.chatting=false;
    this.groupchat=true;
    this.messageList=[];
    this.grpmessageList=[];
    this.pageValue=0;
    this.previousChat=[];
    this.getGroupChat();
    //i am creating one socket instance for listening. 
     if(this.groupdetails.length>0){
       for(let group of this.groupdetails){
            if(group.id==this.active&&group.listening==false){
              this.createGroupSocketConnection();
              let index = this.groupdetails.map(function(item){return item.id}).indexOf(this.active);
              this.groupdetails.splice(index,1);
              break;
            }
       }
     }
     console.log(this.active);
   console.log(this.groupdetails);
  }
  
  public createGroupSocketConnection = ()=>{
    this.socketService.groupchat(this.active).subscribe(
      data=>{
        this.typeCheck=data
        if(this.typeCheck.listenId){
          if(this.typeCheck.listenId==this.active&&this.typeCheck.senderName!=this.userName)
         this.grptyping=true;
         this.typerName=this.typeCheck.senderName;
        }else{
          if(this.typeCheck.groupId==this.active){
          this.grptyping=false;
        this.grpmessageList.push(data);
        console.log(data);
          }
      }
      }
    )
  }
  public grptyping=false;
  public getGroupChat=()=>{
    this.previousChat=(this.grpmessageList.length>0)?this.grpmessageList.slice():[];
    this.httpservice.getPreviousGroupChat(this.active,this.pageValue*20).subscribe(
      (response) =>{
          
          
          this.res=response;
          if(this.res.length>0){
          this.grptyping=false;
           this.grpmessageList= this.res.concat(this.previousChat);
           console.log(this.grpmessageList);
          }else{
            this.toastr.warning('no messages on this group');
          }
        
          
        
      }
      
    )
  }
  public allmem
  public getGroupMembers=()=>{
    this.httpservice.getGroupMem(this.active).subscribe(
      data=>{
        console.log(data);
        this.allmem=data;
        console.log(this.allmem);
      }
    )
  }
  public editGroup(){
    console.log(this.active+" "+this.newGroupName);
    this.httpservice.editGroupName(this.active,this.newGroupName).subscribe(
      data=>{
        this.toastr.success('successful',`group name changed to ${this.newGroupName}`);
      },err=>{
        this.toastr.error('some error occured',"please try again after sometime");
      }
    )
  }
  public DeleteGroup(){
   this.httpservice.deleteGroup(this.active).subscribe(
     data=>{
       console.log(data);
       this.toastr.warning(`${this.receiverName} is deleted`);
       let index1 = this.allGroups.map(function(item){return item.groupId }).indexOf(this.active);
       this.allGroups.splice(index1,1);
     },
     err=>{
       this.toastr.warning('try again later');
     }
   )
  }
  public LeaveGroup(){
    this.httpservice.leaveGroup(this.active,this.userInformation.email).subscribe(
      data=>{
        console.log(data);
        this.toastr.warning(`you left from ${this.receiverName}`);
        let index1 = this.allGroups.map(function(item){return item.groupId }).indexOf(this.active);
        this.allGroups.splice(index1,1);
      },err=>{
        this.toastr.warning('some error occured','try again later');
      }
    )
  }
  public deleteAccount(){
    this.httpservice.deleteaccount(this.email,this.userId).subscribe(
      data=>{
        console.log(data);
        this.deletegroupsAccount();
        this.toastr.success('account deleted');
        
        
      },err=>{
        this.toastr.error('Account cant be deleted','Please Try again!');
      }
    )
  }
  public deletegroupsAccount(){
    this.httpservice.deletegrpaccount(this.email).subscribe(
      data=>{
        console.log(data);
        this.router.navigate(['/login']);
        
        Cookie.deleteAll();
      },err=>{
        this.toastr.error('Account cant be deleted','Please Try again!');
      }
    )
  }
}
 
 