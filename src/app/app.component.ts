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
  retailerId:any
  showName:boolean=false
  responseObject:any
  userName:string=''
  flag:string=''

  userNav:boolean=false
  retailerNav:boolean=false

  constructor(private router:Router,private userService: UserService,private retailerService:RetailerService) { }

  ngOnInit(): void {
    
    this.getHome()

    // if(sessionStorage.getItem('userId')!=null){

      
    //   console.log(typeof(sessionStorage.getItem('userId')))
   

    //   this.flag= 'User'
    //   console.log("user flag",this.flag)
    //   this.userId = JSON.parse(sessionStorage.getItem('userId')!);

    //   console.log("user name : ",this.userId)

    //   //call service
    //   this.userService.getUserById(this.userId).subscribe((data)=>{

    //     this.responseObject = data

    //     console.log(this.responseObject)
    //     this.userName = this.responseObject.data.name
    //     this.showName=true

    //   },(error)=>{
    //     console.log(error)
    //   })

    //   // call user service
    //   this.showName=true
      
 
    //   console.log(sessionStorage.getItem('userId'))

    // }else if(sessionStorage.getItem('retailerId')!=null){
      
     


    //   this.flag = 'Retailer'

    //   console.log("retailer flag",this.flag)
    
     

    //   this.retailerId = JSON.parse(sessionStorage.getItem('retailerId')!);

    //   console.log("user name : ",this.retailerId)

    //   //call service
    //   this.retailerService.getRetailerById(this.retailerId).subscribe((data)=>{

    //     this.responseObject = data

    //     console.log(this.responseObject)
    //     this.userName = this.responseObject.data.shopName
    //     this.showName=true

    //   },(error)=>{
    //     console.log(error)
    //   })

    //   // call user service
    //   this.showName=true
    //  // this.getDetail();
   
    //   console.log(sessionStorage.getItem('userId'))

    // }else{
    //   this.flag='User'
    //   console.log("nothing in logged in")
    // }

   // 
  
  }


  getHome(){

    if(sessionStorage.getItem('userId')!=null){

      // If user is logged in

      this.flag= 'User'
      this.userNav=true;

      this.userId = JSON.parse(sessionStorage.getItem('userId')!);

      

      //call user service
      this.userService.getUserById(this.userId).subscribe((data)=>{

        this.responseObject = data

        console.log(this.responseObject)
        this.userName = this.responseObject.data.name
        this.showName=true

      },(error)=>{
        console.log(error)
      })

      this.showName=true

    }else if(sessionStorage.getItem('retailerId')!=null){
      
      // If retailer is logged in
    
      this.flag = 'Retailer'
      this.retailerNav=true;
      
    
      this.retailerId = JSON.parse(sessionStorage.getItem('retailerId')!);

      //call service
      this.retailerService.getRetailerById(this.retailerId).subscribe((data)=>{

        this.responseObject = data
        this.userName = this.responseObject.data.shopName
        this.showName=true

      },(error)=>{
        console.log(error)
      })

      
    this.showName=true
     
    this.router.navigate(['add-product']);
     

    }else{

      // No one is logged in
      this.flag='User'
      this.userNav=true
      this.router.navigate(['home']);
    }
  }
}

