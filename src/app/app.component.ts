import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RetailerService } from './Service/retailer-service.service';
import { UserService } from './Service/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DotStore';

  userId:any;
  showName:boolean=false
  responseObject:any
  userName:string=''

  constructor(private router:Router,private userService: UserService,private retailerService:RetailerService) { }

  ngOnInit(): void {
    
    this.getHome();

    if(sessionStorage.getItem('userId')!=null){

      console.log(typeof(sessionStorage.getItem('userId')))



      this.userId = JSON.parse(sessionStorage.getItem('userId')!);

      console.log("user name : ",this.userId)

      //call service
      this.userService.getUserById(this.userId).subscribe((data)=>{

        this.responseObject = data

        console.log(this.responseObject)
        this.userName = this.responseObject.data.name
        this.showName=true

      },(error)=>{
        console.log(error)
      })

      // call user service
      this.showName=true
      
    
      console.log(sessionStorage.getItem('userId'))

    }else if(sessionStorage.getItem('retailerId')){
      // call retailer service
      this.showName=true
      console.log(sessionStorage.getItem('retailerId'))
    }
  
  }


  getHome(){
    this.router.navigate(['home']);
  }
}
