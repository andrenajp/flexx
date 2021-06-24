import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import axios from "axios";
import { environment } from "src/environments/environment.prod";
@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"],
})
export class ChatPage implements OnInit {
  url=environment.BASE_URL;
  salon:any;
  barber:any;
  name:string;
  messages:any=[];
  message:string;
  dateMessage:Date;
  alreadyShow:number=0;
  today:Date=new Date();

  user;
  header;
  constructor(
    public router: Router,
    public atvRoute: ActivatedRoute) 
  {
    this.user=JSON.parse(localStorage.getItem('_user'));
    this.header= {
      Authorization: "Bearer " + localStorage.getItem("access_token")
    };
    this.atvRoute.queryParams.subscribe((res) => {
      this.salon = res;
    });
  }

  async ngOnInit() 
  {
    if(this.salon)
      await this.whithSalon();
    else if(this.barber)
      await this.withBarber();
  }
  back()
  {
    if(this.salon)
    {
    this.router.navigate(["/salon-profile"], {
      queryParams: this.salon,
    });
    }else{
      this.router.navigate(["/barbeur-profile"], {
        queryParams: this.barber,
      });
    }
  }

  async withBarber()
  {
    var userMessages=[];
    var otherMessages=[];
    await axios.get(this.url+'/user-chats?user='+this.user.id+'&barber='+this.salon.id+'&_sort=time:ASC',
    {headers: this.header}).then((response)=>{
      userMessages=response.data;
    }).catch((error)=>{console.log(error.response)});

    await axios.get(this.url+'/salon-chats?user='+this.user.id+'&barber='+this.salon.id+'&_sort=time:ASC',
    {headers: this.header}).then((response)=>{
      otherMessages=response.data;
    }).catch((error)=>{console.log(error.response)});

    await this.sort(userMessages,otherMessages);
  }
  async whithSalon()
  {
    var userMessages=[];
    var otherMessages=[];
    await axios.get(this.url+'/user-chats?user='+this.user.id+'&salon='+this.salon.id+'&_sort=time:ASC',
    {headers: this.header}).then((response)=>{
      userMessages=response.data;
    });

    await axios.get(this.url+'/salon-chats?user='+this.user.id+'&salon='+this.salon.id+'&_sort=time:ASC',
    {headers: this.header}).then((response)=>{
      otherMessages=response.data;
    });

    await this.sort(userMessages,otherMessages);
  }

  async sort(userMessages,otherMessages)
  {
    var sortArr=userMessages.concat(otherMessages);
    let comp=(item1,item2)=>{
      if(new Date(item1.time).getTime() > new Date(item2.time).getTime())
        return 1;
      if(new Date(item2.time).getTime() > new Date(item1.time).getTime())
        return -1; 
      return 0;
    }
    await sortArr.sort(comp);
    this.messages=await sortArr;
    if(this.messages.length > 0)
      this.dateMessage=new Date(this.messages[0].time);
  }
  isToday(d)
  {
    const date=new Date(d);
    if(date.getDate() == this.today.getDate() && date.getMonth() == this.today.getMonth() && date.getFullYear() == this.today.getFullYear())
    {
      return true;
    }
    return false;
  }
  
  async send()
  {
    const data={
      message:this.message,
      user:this.user.id,
      time:new Date(),
      salon:this.salon.id
    }
    if(this.message!=undefined && this.message.length > 0)
      await axios.post(this.url+'/user-chats',data,{headers:this.header}).then(()=>{
        this.message="";
        if(this.salon)
          this.whithSalon();
        else if(this.barber)
          this.withBarber();

      })
  }
}
